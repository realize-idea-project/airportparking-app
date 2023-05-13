import React, { FC, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { checkIsLoggedIn } from '../../apis/auth';
import { LoadingSpinner } from '../../components/Spinner';
import { userState } from '../../recoils';

interface Props {
  navigation: CustomNavigationType<'AppStart', 'navigation'>;
}

const AppStart: FC<Props> = ({ navigation }) => {
  const setUser = useSetRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    checkIsLoggedIn()
      .then(({ isSuccess, data }) => {
        const isActiveUser = data?.isActive;
        setIsLoggedIn(isSuccess && isActiveUser);
        setUser(data);
      })
      .catch(({ isSuccess }) => {
        setIsLoggedIn(isSuccess);
      });
  }, []);

  useEffect(() => {
    if (!_.isUndefined(isLoggedIn)) {
      navigation.replace(isLoggedIn ? 'DatePicker' : 'Login');
    }
  }, [isLoggedIn]);

  return <LoadingSpinner />;
};

export default AppStart;
