export const setToken = (token) => localStorage.setItem('Authorization', token);
export const getToken = () => localStorage.getItem('Authorization');
export const deleteToken = () => localStorage.setItem('Authorization', undefined);