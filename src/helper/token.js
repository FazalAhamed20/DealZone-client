export const storeToken = (token) =>  localStorage.setItem('authToken', token); 
export const getToken = () =>  localStorage.getItem('authToken')
export const removeToken =()=>{return localStorage.removeItem('authToken');}