// Curated country list for the phone field (flag, name, ISO code, dial code).
// Ordered with the most relevant markets for Super Sheldon first.
export const COUNTRIES = [
  { iso: "AU", name: "Australia", dial: "61", flag: "🇦🇺" },
  { iso: "IN", name: "India", dial: "91", flag: "🇮🇳" },
  { iso: "US", name: "United States", dial: "1", flag: "🇺🇸" },
  { iso: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧" },
  { iso: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿" },
  { iso: "CA", name: "Canada", dial: "1", flag: "🇨🇦" },
  { iso: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪" },
  { iso: "SG", name: "Singapore", dial: "65", flag: "🇸🇬" },
  { iso: "SA", name: "Saudi Arabia", dial: "966", flag: "🇸🇦" },
  { iso: "QA", name: "Qatar", dial: "974", flag: "🇶🇦" },
  { iso: "KW", name: "Kuwait", dial: "965", flag: "🇰🇼" },
  { iso: "OM", name: "Oman", dial: "968", flag: "🇴🇲" },
  { iso: "BH", name: "Bahrain", dial: "973", flag: "🇧🇭" },
  { iso: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾" },
  { iso: "ID", name: "Indonesia", dial: "62", flag: "🇮🇩" },
  { iso: "PH", name: "Philippines", dial: "63", flag: "🇵🇭" },
  { iso: "PK", name: "Pakistan", dial: "92", flag: "🇵🇰" },
  { iso: "BD", name: "Bangladesh", dial: "880", flag: "🇧🇩" },
  { iso: "LK", name: "Sri Lanka", dial: "94", flag: "🇱🇰" },
  { iso: "NP", name: "Nepal", dial: "977", flag: "🇳🇵" },
  { iso: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦" },
  { iso: "NG", name: "Nigeria", dial: "234", flag: "🇳🇬" },
  { iso: "KE", name: "Kenya", dial: "254", flag: "🇰🇪" },
  { iso: "IE", name: "Ireland", dial: "353", flag: "🇮🇪" },
  { iso: "DE", name: "Germany", dial: "49", flag: "🇩🇪" },
  { iso: "FR", name: "France", dial: "33", flag: "🇫🇷" },
  { iso: "NL", name: "Netherlands", dial: "31", flag: "🇳🇱" },
  { iso: "ES", name: "Spain", dial: "34", flag: "🇪🇸" },
  { iso: "IT", name: "Italy", dial: "39", flag: "🇮🇹" },
  { iso: "SE", name: "Sweden", dial: "46", flag: "🇸🇪" },
  { iso: "CH", name: "Switzerland", dial: "41", flag: "🇨🇭" },
  { iso: "HK", name: "Hong Kong", dial: "852", flag: "🇭🇰" },
  { iso: "JP", name: "Japan", dial: "81", flag: "🇯🇵" },
  { iso: "CN", name: "China", dial: "86", flag: "🇨🇳" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Australia

export function findByIso(iso) {
  if (!iso) return null;
  return COUNTRIES.find((c) => c.iso === String(iso).toUpperCase()) || null;
}
