import Team from '../models/Team.js';

// Create a new team member
export const createTeam = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.profileImage = req.file.path;
    }
    const team = new Team(data);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all team members
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a team member by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team member not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a team member
export const updateTeam = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.profileImage = req.file.path;
    }
    const team = await Team.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!team) return res.status(404).json({ error: 'Team member not found' });
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a team member
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 