import { useEffect, useState } from "react";

import { FaBell } from "react-icons/fa";

import toast from "react-hot-toast";

import api from "../../api/axios";

import socket from "../../socket/socket";

const NotificationBell = () => {

  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  // fetch notifications
  const fetchNotifications = async () => {

    try {

      const { data } =
        await api.get("/notifications");

      setNotifications(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchNotifications();

    // realtime listener
    socket.on(
      "new-notification",
      (notification) => {

        // toast popup
        toast.success(notification.message);

        // add to state instantly
        setNotifications((prev) => [
          notification,
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off("new-notification");
    };

  }, []);

  // unread count
  const unreadCount =
    notifications.filter(
      (n) => !n.read
    ).length;

  // mark single read
  const markAsRead = async (id) => {

    try {

      await api.put(
        `/notifications/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id
            ? { ...n, read: true }
            : n
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  // mark all read
  const markAllAsRead = async () => {

    try {

      await api.put(
        "/notifications/read-all"
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">

      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          bg-slate-100
          p-3
          rounded-full
          hover:bg-slate-200
          transition
        "
      >

        <FaBell className="text-slate-700" />

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {unreadCount}
          </span>
        )}

      </button>

      {/* Dropdown */}
      {open && (

        <div
          className="
            absolute
            right-0
            mt-3
            w-96
            bg-white
            border
            border-slate-200
            rounded-2xl
            shadow-xl
            z-50
          "
        >

          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              p-4
              border-b
            "
          >

            <h3 className="font-semibold">
              Notifications
            </h3>

            <button
              onClick={markAllAsRead}
              className="
                text-sm
                text-blue-600
                hover:underline
              "
            >
              Mark all read
            </button>

          </div>

          {/* Notifications */}
          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (

              <div className="p-6 text-center text-slate-500">
                No notifications
              </div>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification._id}
                  onClick={() =>
                    markAsRead(notification._id)
                  }
                  className={`
                    p-4
                    border-b
                    cursor-pointer
                    hover:bg-slate-50
                    transition
                    ${
                      !notification.read
                        ? "bg-blue-50"
                        : ""
                    }
                  `}
                >

                  <p className="font-medium text-slate-700">
                    {notification.message}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default NotificationBell;