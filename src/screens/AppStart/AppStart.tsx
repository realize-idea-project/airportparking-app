import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { checkIsLoggedIn } from '../../apis/auth';

interface Props {
  navigation: CustomNavigationType<'AppStart', 'navigation'>;
}

const AppStart: FC<Props> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    checkIsLoggedIn()
      .then((res) => setIsLoggedIn(res))
      .catch((e) => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    if (!_.isUndefined(isLoggedIn)) {
      navigation.replace(isLoggedIn ? 'DatePicker' : 'Login');
    }
  }, [isLoggedIn]);

  return null;
};

export default AppStart;
