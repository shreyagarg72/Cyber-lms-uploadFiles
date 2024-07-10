import Notification from '../models/notification.js';
import { notifyClients } from '../index.js';

export const createNotification = async (req, res) => {
  const { date, timeFrom, timeTo, title, instructor } = req.body;
  const notification = new Notification({ date, timeFrom, timeTo, title, instructor });

  try {
    const newNotification = await notification.save();
    notifyClients(newNotification); // Notify clients
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }); // Sort by creation time
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.status(200).json({ message: 'Notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
