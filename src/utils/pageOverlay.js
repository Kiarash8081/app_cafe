export function openOverlayPage(id) {
  document.getElementById(id)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeOverlayPage(id) {
  document.getElementById(id)?.classList.remove('active');
  const site = document.querySelector('.site');
  if (site) site.style.display = '';
  document.body.style.overflow = '';
}

export function switchOverlayPage(fromId, toId) {
  document.getElementById(fromId)?.classList.remove('active');
  document.getElementById(toId)?.classList.add('active');
  const site = document.querySelector('.site');
  if (site) site.style.display = 'none';
  document.body.style.overflow = 'hidden';
}
