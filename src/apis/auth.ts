import Config from 'react-native-config';

export const login = async (userId: string, password: string) => {
  const url = `${Config.API_URL}/auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    });

    const result = await response.json();

    console.log('result', result);
    return result;
  } catch (e) {
    console.error('An error occurred in login', e);
    throw e;
  }
};
