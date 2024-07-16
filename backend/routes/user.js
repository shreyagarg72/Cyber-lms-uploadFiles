// routes/users.js
import express from 'express';
const router = express.Router();
import User from '../models/user.js'; // Adjust path as necessary

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

export default router;
