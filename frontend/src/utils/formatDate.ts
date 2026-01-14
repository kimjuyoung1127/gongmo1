export function formatDate(dateString: string, locale: string = 'ko'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  if (diffInSeconds < MINUTE) {
    if (locale === 'ko') return '방금 전';
    if (locale === 'km') return 'មួយភ្លែតមុន';
    return 'Just now';
  }

  if (diffInSeconds < HOUR) {
    const minutes = Math.floor(diffInSeconds / MINUTE);
    if (locale === 'ko') return `${minutes}분 전`;
    if (locale === 'km') return `${minutes} នាទីមុន`;
    return `${minutes}m ago`;
  }

  if (diffInSeconds < DAY) {
    const hours = Math.floor(diffInSeconds / HOUR);
    if (locale === 'ko') return `${hours}시간 전`;
    if (locale === 'km') return `${hours} ម៉ោងមុន`;
    return `${hours}h ago`;
  }

  if (diffInSeconds < DAY * 7) {
    const days = Math.floor(diffInSeconds / DAY);
    if (locale === 'ko') return `${days}일 전`;
    if (locale === 'km') return `${days} ថ្ងៃមុន`;
    return `${days}d ago`;
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatDateTime(dateString: string, locale: string = 'ko'): string {
  const date = new Date(dateString);
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
