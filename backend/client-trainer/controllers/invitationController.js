const Invitation = require('../models/Invitation');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const ClientCoachLink = require('../models/ClientCoachLink');

const sendInvitation = async (req, res) => {
  const { inviterID, inviteeID } = req.body;
  // todo - only current trainer can send his own invitation
  try {
    if (!inviterID || !inviteeID) {
      throw new ApiError(400, 'inviterID and inviteeID are required.');
    }

    const inviter = await User.findByPk(inviterID);
    const invitee = await User.findByPk(inviteeID);

    if (!inviter || inviter.role !== 'client' || !invitee || invitee.role !== 'trainer') {
      throw new ApiError(400, 'Invalid inviterID or inviteeID.');
    }

    const existing = await Invitation.findOne({ where: { inviterID, inviteeID } });
    if (existing) {
      throw new ApiError(409, 'Invitation already exists.');
    }

    await Invitation.create({ inviterID, inviteeID });

    res.status(200).json({});
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const getPendingInvitations = async (req, res) => {
  const userID = '1'; // TODO - take from token
  try {
    const invitations = await Invitation.findAll({ where: { inviteeID: userID } });    
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const respondToInvitation = async(req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const userId = '1'; // TODO take from token

  try {
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation with the given ID not found.' });
    }
    if (invitation.inviteeID !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only respond to your own invitations' });
    }

    if (action === 'accept') {
      await ClientCoachLink.create({
        clientID: invitation.inviterID,
        coachID: invitation.inviteeID
      });
    } else if (action !== 'reject') {
      return res.status(400).json({ error: 'Invalid action. Use \"accept\" or \"reject\".' });
    }

    await invitation.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
}

module.exports = { sendInvitation, getPendingInvitations, respondToInvitation };
