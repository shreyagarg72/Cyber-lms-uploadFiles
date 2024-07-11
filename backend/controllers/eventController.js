import Event from '../models/event.js';
import Notification from '../models/notification.js';
import { notifyClients } from '../index.js';

export const createEvent = async (req, res) => {
  const { date, timeFrom, timeTo, title, instructor } = req.body;
  const event = new Event({ date, timeFrom, timeTo, title, instructor });

  try {
    const newEvent = await event.save();

    // Save notification to the database
    const notification = new Notification({ date, timeFrom, timeTo, title, instructor, createdAt: newEvent.createdAt });
    await notification.save();

    notifyClients(newEvent); // Notify clients
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Notify clients about the deletion
    notifyClients({ ...event.toObject(), deleted: true });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
