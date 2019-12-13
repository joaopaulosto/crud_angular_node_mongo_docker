const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({   
    name: String,
    dateOfBirth: Date,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Owner', OwnerSchema);
