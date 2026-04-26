const UTM = "utm_source=remitcheck&utm_medium=comparison&utm_campaign=send";

export const PARTNER_LINKS: Record<string, string> = {
  Wise:           `https://wise.com?${UTM}`,
  Revolut:        `https://revolut.com?${UTM}`,
  Remitly:        `https://remitly.com?${UTM}`,
  MoneyGram:      `https://moneygram.com?${UTM}`,
  "Western Union":`https://westernunion.com?${UTM}`,
};
