let hasVisitedInApp = false;

export function isPreloaderAlreadyShown(): boolean {
  if (typeof window === "undefined") return false;
  if (hasVisitedInApp) return true;
  try {
    return Boolean(sessionStorage.getItem("portfolio_preloader_shown"));
  } catch {
    return false;
  }
}

export function markPreloaderAsShown(): void {
  hasVisitedInApp = true;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("portfolio_preloader_shown", "true");
    } catch {
      // Ignore sessionStorage availability/quota issues
    }
  }
}
