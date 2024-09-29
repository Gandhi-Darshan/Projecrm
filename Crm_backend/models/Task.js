const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  due_date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'in-progress'], default: 'pending' },
//   equipment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
