function useNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY, callback) {
  const notification = new window.Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  });

  notification.onclick = callback;

  notification.show();

  return notification;
}

export default useNotification;
