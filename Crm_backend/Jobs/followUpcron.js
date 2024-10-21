const cron = require('node-cron');
const FollowUp = require('../models/FollowUp');
const Task = require('../models/Task');  // Assuming you have a Task model
const sendEmail = require('../utils/emailService');

// Schedule job to run every hour
cron.schedule('* * * * *', async () => { 
  const currentDate = new Date();
  console.log("Current Date:", currentDate); // Debugging log

  // ===== For Customers: Check follow-ups =====
  const followUps = await FollowUp.find({
    trigger_date: { $lte: currentDate },
    status: 'pending'
  }).populate('customer_id');

  console.log("Follow-ups found:", followUps); // Debugging log
  for (const followUp of followUps) {
    const { customer_id, email_type } = followUp;

    // Check if the customer is subscribed to email
    if (customer_id && customer_id.email_subscribed) {
      try {
        // Send email to customer
        await sendEmail({
          email: customer_id.email,
          subject: `Automated Follow-Up: ${email_type}`,
          message: `Dear ${customer_id.name}, this is your follow-up for ${email_type}.`
        });
        
        // Mark follow-up as sent
        await FollowUp.findByIdAndUpdate(followUp._id, { status: 'sent' });
        console.log(`Follow-up email sent to customer: ${customer_id.email}`);
      } catch (error) {
        console.error(`Error sending email to customer ${customer_id.email}:`, error.message);
      }
    }
  }

const tasks = await Task.find({
  due_date: { $lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) }, // Tasks due in 24 hours
  status: 'pending'
}).populate('assigned_to'); // Ensure this matches your model

console.log("Pending tasks found:", tasks); // Debugging log
for (const task of tasks) {
  const { assigned_to, _id: taskId } = task; // Get employee info and task ID

  if (assigned_to && assigned_to.email) {
    try {
      // Check for a corresponding pending follow-up for the current task
      const followUp = await FollowUp.findOne({
        employee_id: assigned_to._id,     // Ensure you have task_id in your FollowUp model
        status: 'pending'     // Only consider follow-ups that are still pending
      });

      // If a pending follow-up exists, proceed to send the email
      if (followUp) {
        // Send email reminder to employee about pending task
        await sendEmail({
          email: assigned_to.email,
          subject: `Task Reminder: ${task.task_name}`, // Ensure this field matches your model
          message: `Dear ${assigned_to.name}, your task "${task.task_name}" is due on ${task.due_date}. Please complete it soon.`
        });

        // Update the follow-up status to "sent"
        await FollowUp.findByIdAndUpdate(followUp._id, { status: 'sent' }); // Update to "sent"

        console.log(`Reminder email sent to employee: ${assigned_to.email}`);
      } else {
        console.log(`No pending follow-up found for task: ${task.task_name}`);
      }
    } catch (error) {
      console.error(`Error sending email to employee ${assigned_to.email}:`, error.message);
    }
  }
}
});
