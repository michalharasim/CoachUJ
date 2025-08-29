const ApiError = require('../utils/ApiError');
const User = require('../models/User');


const updateUserProfile = async (req, res) => {
  const requestingUserId = req.user_id;
  try {
    const user = await User.findOne({
      where: {
        userID: requestingUserId
      }
    });

    if (!user) {
      throw new ApiError(404, 'User with the given ID not found');
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.picture = `/uploads/${req.file.filename}`;
    }

    await user.update(updateData);

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

const getUserNavProfile = async (req, res) => {
  const requestingUserId = req.user_id;
  try {
    const user = await User.findOne({
      where: {
        userID: requestingUserId,
      },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Transform sequelize object to insert email
    const userProfile = user.get({ plain: true });
    const returnData = {
      picture: userProfile.picture,
      username: userProfile.username,
      email: req.email,
      isCoach: userProfile.role === "trainer",
      id: req.user_id,
    }

    res.status(200).json(returnData);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const getUserProfile = async (req, res) => {
  let requestingUserId;
  if (req.params.userID) {
    requestingUserId = req.params.userID;
  } else {
    requestingUserId = req.user_id;
  }

  try {
    const user = await User.findOne({
      where: {
        userID: requestingUserId,
      },attributes: ['userID', 'username', 'picture', "givenName", "surname" ]
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = { updateUserProfile, syncUserFromAuthorization, getUserProfile, getUserNavProfile};