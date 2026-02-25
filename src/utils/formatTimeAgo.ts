
const periods = {
  year: 365 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

export function formatTimeAgo(dateString: string): string {
  const now = new Date().getTime();
  const then = new Date(dateString).getTime();
  const diff = now - then;

  if (diff > periods.year) {
    const count = Math.floor(diff / periods.year);
    return `${count} year${count > 1 ? 's' : ''} ago`;
  }
  if (diff > periods.month) {
    const count = Math.floor(diff / periods.month);
    return `${count} month${count > 1 ? 's' : ''} ago`;
  }
  if (diff > periods.week) {
    const count = Math.floor(diff / periods.week);
    return `${count} week${count > 1 ? 's' : ''} ago`;
  }
  if (diff > periods.day) {
    const count = Math.floor(diff / periods.day);
    return `${count} day${count > 1 ? 's' : ''} ago`;
  }
  if (diff > periods.hour) {
    const count = Math.floor(diff / periods.hour);
    return `${count} hour${count > 1 ? 's' : ''} ago`;
  }
  if (diff > periods.minute) {
    const count = Math.floor(diff / periods.minute);
    return `${count} minute${count > 1 ? 's' : ''} ago`;
  }

  return 'Just now';
}
