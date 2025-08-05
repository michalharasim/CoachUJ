const ApiError = require('../utils/ApiError');
const User = require('../models/User');


const updateUserProfile = async (req, res) => {
  const targetUserId = req.params.userId;
  const requestingUserId = req.user_id;
  try {
    if (String(requestingUserId) !== String(targetUserId)) {
      throw new ApiError(403, 'You can only edit your own profile');
    }

    const user = await User.findOne({
      where: {
        userID: targetUserId
      }
    });

    if (!user) {
      throw new ApiError(404, 'User with the given ID not found');
    }

    await user.update(req.body);

    res.status(200).json(user);

  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const syncUserFromAuthorization = async (req, res) => {
  const authUser = req.body;
  if (!authUser || !authUser.id || !authUser.username || !authUser.role) {
    return res.status(400).json({ error: 'Missing required user data' });
  }

  try {
    const existing = await User.findOne({ where: { userID: authUser.id } });
    if (existing) return res.status(200).json(existing);

    const newUser = await User.create({
      userID: authUser.id,
      username: authUser.username,
      role: authUser.role === 'trainer' ? 'trainer' : 'client'
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { updateUserProfile, syncUserFromAuthorization };