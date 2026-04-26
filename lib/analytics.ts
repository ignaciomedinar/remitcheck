declare function gtag(...args: unknown[]): void;

export function trackAffiliateClick(partnerName: string): void {
  if (typeof window === "undefined" || typeof gtag === "undefined") return;
  gtag("event", "affiliate_click", {
    partner_name: partnerName,
  });
}
