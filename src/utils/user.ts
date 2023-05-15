import { IAuthentification } from '../@types/user';

export const getUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) as IAuthentification : null;
  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
