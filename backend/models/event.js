import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeFrom: { type: String, required: true }, // Update field name
  timeTo: { type: String, required: true },   // Add timeTo field
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Add createdAt field
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
