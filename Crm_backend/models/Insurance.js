const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    provider:{type:String, required: true},
    policyNumber:{type: String, required:true},
    coverageDetails: {type: String, required:true},
    expiryDate:{type:String,required:true}
}, { timestamps: true });

module.exports = mongoose.model('Insurance', insuranceSchema);







