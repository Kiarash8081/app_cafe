export const ADMIN = { username: 'kiarash', password: 'k1386k1386' };

export function isAdminLogin(username, password) {
  return username.trim().toLowerCase() === ADMIN.username && password === ADMIN.password;
}

export function isAdminUser(user) {
  return Boolean(user && user.role === 'admin' && user.username === ADMIN.username);
}
