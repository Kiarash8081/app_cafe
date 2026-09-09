export const EMPTY_SITE_CONTENT = {
  brand: '',
  title: '',
  text: '',
  hours: '',
  address: '',
  phone: '',
  mapLat: '',
  mapLng: '',
  mapOn: false
};

export function filled(value) {
  return Boolean(value && String(value).trim());
}

export function pickSite(site, key, fallback = '') {
  return filled(site?.[key]) ? String(site[key]).trim() : fallback;
}

export function mapEmbedSrc(site) {
  if (!site?.mapOn) return '';
  const lat = String(site.mapLat || '').trim();
  const lng = String(site.mapLng || '').trim();
  if (lat && lng) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=16&output=embed`;
  }
  const address = String(site.address || '').trim();
  if (!address) return '';
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}
