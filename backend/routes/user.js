// routes/users.js
import express from 'express';
const router = express.Router();
import User from '../models/user.js'; // Adjust path as necessary
import verifyToken from "../middlewares/authMiddleware.js";
router.get('/registrations-per-month', async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.get('/users/monthly-count', async (req, res) => {
  try {
    // This is just a placeholder; adjust according to your data structure and logic
    const monthlyCounts = await User.aggregate([
      { $group: { _id: { $month: "$date_of_registration" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Format monthlyCounts into an array of counts for each month
    const countsArray = new Array(12).fill(0); // Assuming 12 months
    monthlyCounts.forEach(month => {
      countsArray[month._id - 1] = month.count; // -1 because months are 1-12
    });

    res.json(countsArray);
  } catch (error) {
    console.error("Error fetching monthly user counts:", error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/users/total-count', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total users' });
  }
});
router.get('/users/cpf', verifyToken, async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { hasCyberPeaceFoundation: 'Yes' } },
      { $group: { _id: '$universityName', userCount: { $sum: 1 } } },
      { $project: { _id: 0, universityName: '$_id', userCount: 1 } }
    ]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
