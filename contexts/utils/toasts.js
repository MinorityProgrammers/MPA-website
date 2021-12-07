import Toastify from 'toastify-js';

// toast notifications

export const successToast = (message) => {
  Toastify({
    text: `${message}`,
    duration: 3000,
    close: true,
    position: 'right',
    backgroundColor: 'green',
    color: 'white',
  }).showToast();
};
export const errorToast = (message) => {
  Toastify({
    text: `${message}`,
    duration: 3000,
    close: true,
    position: 'right',
    backgroundColor: 'red',
    color: 'white',
  }).showToast();
};
export const notificationToast = (message) => {
  Toastify({
    text: `${message}`,
    duration: 3000,
    close: true,
    position: 'right',
    backgroundColor: 'grey',
    color: 'white',
  }).showToast();
};
