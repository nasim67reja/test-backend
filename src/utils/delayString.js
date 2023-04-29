const delayString = (seconds) => {
  const sec = seconds % 60;
  // eslint-disable-next-line no-param-reassign
  seconds -= sec;
  let min = seconds / 60;
  const temp = min;
  min %= 60;
  const hour = (temp - min) / 60;

  let str = '';
  if (hour > 0) {
    str += `${hour} hour`;
    if (hour > 1) str += 's';
    if (min > 0 || sec > 0) str += ', ';
  }
  if (min > 0) {
    str += `${min} minute`;
    if (min > 1) str += 's';
    if (sec > 0) str += ', ';
  }
  if (sec > 0) {
    str += `${sec} second`;
    if (sec > 1) str += 's';
  }
  return str;
};

module.exports = delayString;
