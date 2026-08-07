const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();

/**
 * <html> üzerindeki "dark" class'ını okuyup değiştiren, React'ten bağımsız
 * küçük bir pub-sub deposu. `useSyncExternalStore` ile kullanılmak üzere
 * tasarlandı: bu hook, sunucu/istemci arasında farklı olabilecek dış
 * durumları (burada: DOM class'ı) hydration uyumsuzluğu yaratmadan okumak
 * için React'in resmi çözümüdür — bir useEffect içinde setState çağırmaktan
 * (eski, artık önerilmeyen yöntem) daha doğrudur.
 */
export function subscribeToTheme(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}

export function getThemeServerSnapshot() {
  return false;
}

export function setTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // localStorage erişilemez olabilir (örn. gizli sekme); tema o oturum
    // için yine de değişir, sadece kalıcı olmaz.
  }
  listeners.forEach((listener) => listener());
}