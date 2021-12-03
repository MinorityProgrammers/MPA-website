import axios from 'axios';

// auth control
export default function setAthorizationToken(token) {
  if (token) {
    axios.defaults.headers.Authorization = `${token}`;
  } else {
    delete axios.defaults.headers.authorization;
  }
}
