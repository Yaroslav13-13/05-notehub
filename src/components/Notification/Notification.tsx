import React, { useEffect } from "react";
import css from "./Notification.module.css";

interface NotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({
  message,
  onClose,
  duration = 5000,
  type = "success",
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const notificationClass = type === "error" ? css.error : css.notification;

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;
