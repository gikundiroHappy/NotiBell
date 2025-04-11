export const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const day = dayNames[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const year = date.getFullYear();

  return `${day} ${month} ${dateNum < 10 ? '0' + dateNum : dateNum} ${year}`;
};

export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};