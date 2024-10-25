const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Fixed ref quotes
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  email_type: { type: String, required: true },
  trigger_date: { type: Date, required: true },
  status: { type: String, enum: ['due', 'sent'], default: 'due' }
}, { timestamps: true });

module.exports = mongoose.model('FollowUp', followUpSchema);
