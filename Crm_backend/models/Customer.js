const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email:{type:String, required: true},
  medical_history: { type: String },
  contact_details: { type: String, required: true },
  insurance_details: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' },
  email_subscribed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
