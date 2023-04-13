function useNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY) {
  new window.Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  }).show();
}

export default useNotification;
