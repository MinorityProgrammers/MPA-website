const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const justnowtime = 10 * 60 * 1000;
const oneDay = 24 * 60 * 60 * 1000;

export function timeago(dateDB) {
  const NOW = new Date();
  const date = new Date(dateDB);

  if ((NOW - date) < justnowtime) return 'Just now';
  if ((NOW - date) < oneDay && NOW.getDate() == date.getDate()) return 'Today';

  const month = months[date.getMonth()];
  let hour = date.getHours() % 12;
  if (hour == 0) hour = 12;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let ampm;
  if (date.getHours() < 12) ampm = 'am';
  else ampm = 'pm';
  const dateStr = `${month} ${date.getDate()}, ${date.getFullYear()}, ${hour}:${minutes}${ampm}`;
  return dateStr;
}
