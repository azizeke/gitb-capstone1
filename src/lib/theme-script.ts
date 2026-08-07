/**
 * Sayfa boyanmadan ÖNCE çalışması gereken script. Bu yüzden React
 * state'i değil, doğrudan localStorage + matchMedia okuyup <html>
 * class'ını senkron olarak ayarlıyor. React hidrasyonundan önce
 * çalıştığı için layout'larda `suppressHydrationWarning` kullanılıyor
 * (aksi halde React, sunucu ve istemci arasındaki <html> class farkı
 * için gereksiz bir uyarı verir).
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored !== 'light' && prefersDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;