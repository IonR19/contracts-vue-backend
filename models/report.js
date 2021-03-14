const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name: { type: String, required: true },
    data: { type: String, required: true },
    createdBy: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    location: { type: String, required: true },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Report', reportSchema);
