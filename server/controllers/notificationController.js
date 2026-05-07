import Notification from "../models/Notification.js";


// get notifications
export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// mark single notification as read
export const markAsRead = async (req, res) => {

  try {

    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// mark all as read
export const markAllAsRead = async (req, res) => {

  try {

    await Notification.updateMany(
      {},
      { read: true }
    );

    res.json({
      message: "All notifications marked as read",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};