const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sx = new Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    createdBy: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    beginData: { type: Date, required: true },
    endData: { type: Date, required: true },
    signData: { type: Date, required: true },
    location: { type: String, required: true },
    value: { type: String, required: true }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Contract', sx);
