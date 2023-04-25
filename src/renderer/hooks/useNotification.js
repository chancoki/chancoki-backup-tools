/**
 * Creates and displays a new notification with the given title and body.
 *
 * @param {string} NOTIFICATION_TITLE - The title of the notification.
 * @param {string} NOTIFICATION_BODY - The body text of the notification.
 * @param {function} callback - A function to be called when the notification is clicked.
 * @returns {Notification} The newly created Notification object.
 */
function useNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY, callback) {
  // Create a new Notification object with the given title and body.
  const notification = new window.Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  });

  // Set the notification's onclick event to the given callback function.
  notification.onclick = callback;

  // Display the notification to the user.
  notification.show();

  // Return the newly created Notification object.
  return notification;
}
