export function formatDate(dateString: string, locale: string = 'ko'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  if (diffInSeconds < MINUTE) {
    return locale === 'ko' ? '방금 전' : 'Just now';
  }

  if (diffInSeconds < HOUR) {
    const minutes = Math.floor(diffInSeconds / MINUTE);
    return locale === 'ko' ? `${minutes}분 전` : `${minutes}m ago`;
  }

  if (diffInSeconds < DAY) {
    const hours = Math.floor(diffInSeconds / HOUR);
    return locale === 'ko' ? `${hours}시간 전` : `${hours}h ago`;
  }

  if (diffInSeconds < DAY * 7) {
    const days = Math.floor(diffInSeconds / DAY);
    return locale === 'ko' ? `${days}일 전` : `${days}d ago`;
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
