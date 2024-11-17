const express = require('express');
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/authMiddleWare');

const router = express.Router();

// // Create activity
// router.post('/', authMiddleware, async (req, res) => {
//     const { type, points } = req.body;

//     try {
//         const activity = new Activity({
//             userId: req.userId,
//             type,
//             points,
//             date: new Date(),
//         });

//         await activity.save();
//         res.status(201).json(activity);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// ===================
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { description } = req.body;
        const activity = new Activity({
            userId: req.user.id,
            description,
            date: new Date()
        });
        await activity.save();

    // Update user points
    const user = await User.findById(req.user.id);
    user.points += 10; // assuming 10 points per activity
    await user.save();
        
        res.status(201).json({ message: 'Activity logged', activity });
    } catch (error) {
        res.status(500).json({ message: 'Error logging activity' });
    }
});



module.exports = router;
