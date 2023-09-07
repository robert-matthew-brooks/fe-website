export function getShortDate(timestamp) {
  if (timestamp) {
    const date = new Date(Date.parse(timestamp));

    const year = date.getUTCFullYear();

    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ][date.getUTCMonth()];

    const day = date.getUTCDate();

    return `${month} ${day}, ${year}`;
  } else {
    return null;
  }
}
