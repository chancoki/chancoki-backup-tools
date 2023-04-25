/**
 * A function that displays a dialog box with a message and returns a promise.
 * The promise resolves if the user clicks "OK" and rejects if the user clicks "Cancel".
 * @param {string} message - The message to display in the dialog box.
 * @returns {Promise} A promise that resolves if the user clicks "OK" and rejects if the user clicks "Cancel".
 */
function useDialog(message) {
  return new Promise((resolve, reject) => {
    if (confirm(message)) {
      // Displays a dialog box with the message and returns true if the user clicks "OK".
      resolve(); // Resolves the promise if the user clicks "OK".
      return;
    }

    reject(); // Rejects the promise if the user clicks "Cancel".
  });
}

export default useDialog;
