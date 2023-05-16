import { IAuthentification } from '../@types/user';

export const getUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) as IAuthentification : null;
  console.log('utils user: userData', userData);
  console.log('utils user: userData TOKEN', userData.token);

  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
