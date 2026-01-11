const AUTH_CHANGE_EVENT = 'auth:changed';

export function emitAuthChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function onAuthChange(handler: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
