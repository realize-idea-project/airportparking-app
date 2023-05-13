import Config from 'react-native-config';
import _ from 'lodash';

import { STORAGE_KEY, storeData, getData, deleteData } from '../shared/storage';

export const login = async (userId: string, password: string) => {
  const url = `${Config.API_URL}/auth/login/app`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { isSuccess, data } = await response.json();
    console.log('data', data);
    if (isSuccess) saveSessionId(response);

    return { isSuccess, data };
  } catch (e) {
    console.error('An error occurred in login', e);
    return { isSuccess: false };
    // throw e;
  }
};

// error
export const checkIsLoggedIn = async () => {
  const url = `${Config.API_URL}/auth/isAuthenticated`;
  try {
    const sessionId = await getSessionId();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: sessionId,
      },
    });
    const { isSuccess, data } = await response.json();

    return { isSuccess, data };
  } catch (e) {
    // currently app and admin rely on the same server
    // so that it doesn't handle well when login fail.
    // when this api call fail always occur an error
    console.error('An error occurred in login', e);
    await removeSessionId();
    return { isSuccess: false };
  }
};

const saveSessionId = async (response: Response) => {
  const cookie = _.get(response.headers, ['map', 'set-cookie']);
  await storeData(STORAGE_KEY.login, cookie);
};

const getSessionId = async () => {
  const id = await getData(STORAGE_KEY.login);
  return id;
};

const removeSessionId = async () => {
  await deleteData(STORAGE_KEY.login);
};
