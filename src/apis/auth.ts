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

    const { isSuccess } = await response.json();
    if (isSuccess) saveSessionId(response);

    return isSuccess;
  } catch (e) {
    console.error('An error occurred in login', e);
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
    const { isSuccess } = await response.json();

    return isSuccess;
  } catch (e) {
    // currently app and admin rely on the same server
    // so that it doesn't handle well when login fail.
    // when this api call fail always occur an error
    console.error('An error occurred in login', e);
    return false;
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
