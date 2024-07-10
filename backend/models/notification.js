import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeFrom: { type: String, required: true }, // Update field name
  timeTo: { type: String, required: true },   // Add timeTo field
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Add createdAt field
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
