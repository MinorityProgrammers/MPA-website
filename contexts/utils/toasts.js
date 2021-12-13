import Toastify from 'toastify-js';
import { notification } from 'antd';
// toast notifications

export const successToast = (message) => {
  notification.success({
    message: 'Success',
    description: message,
  });
};
export const errorToast = (message) => {
  notification.error({
    message: 'Error',
    description: message,
  });
};
