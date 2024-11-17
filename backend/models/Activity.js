const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
    points: { type: Number, required: true },
});

module.exports = mongoose.model('Activity', activitySchema, 'activities');
