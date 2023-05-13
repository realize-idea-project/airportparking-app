import _ from 'lodash';

import { login } from '../../apis';
import { alertMessages, globalTextString } from '../DailyChart/constants';

export type LoginResult = 'success' | 'fail' | 'error' | 'invalid';

export const handleLogin = async (id?: string, pw?: string): Promise<LoginResult> => {
  try {
    if (_.isNil(id) || _.isNil(pw)) return 'invalid';

    const isSuccess = await login(id, pw);
    return isSuccess ? 'success' : 'fail';
  } catch (err) {
    return 'error';
  }
};

export const getAlertText = (result: LoginResult) => {
  switch (result) {
    case 'invalid':
      return { title: globalTextString.login, message: alertMessages.wrongIdAndPw };
    case 'fail':
      return { title: globalTextString.login, message: alertMessages.failLogin };
    case 'error':
      return { title: globalTextString.login, message: alertMessages.failLogin };
    default:
      return null;
  }
};
