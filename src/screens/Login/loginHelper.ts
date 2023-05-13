import _ from 'lodash';

import { login } from '../../apis';
import { alertMessages, globalTextString } from '../DailyChart/constants';

export type LoginState = 'success' | 'fail' | 'error' | 'invalid';

interface LoginResult {
  state: LoginState;
  data?: any;
}

export const handleLogin = async (id?: string, pw?: string): Promise<LoginResult> => {
  try {
    if (_.isNil(id) || _.isNil(pw)) {
      return { state: 'invalid' };
    }

    const { isSuccess, data } = await login(id, pw);

    if (!isSuccess || _.isNil(data)) {
      return { state: 'fail' };
    }

    return {
      state: 'success',
      data,
    };
  } catch (err) {
    return { state: 'error' };
  }
};

export const getAlertText = (result: LoginState) => {
  switch (result) {
    case 'invalid':
      return { title: globalTextString.login, message: alertMessages.wrongIdAndPw };
    case 'fail':
      return { title: globalTextString.login, message: alertMessages.failLogin };
    case 'error':
      return { title: globalTextString.login, message: alertMessages.failLogin };
    default:
      return { title: globalTextString.login, message: alertMessages.failLogin };
  }
};
