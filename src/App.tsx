import React from 'react';
import Config from 'react-native-config';
import { RecoilRoot } from 'recoil';
import AppNavigationProvider from './navigations';

const App = () => {
  console.log(Config.ENV);
  return (
    <RecoilRoot>
      <AppNavigationProvider />
    </RecoilRoot>
  );
};

export default App;
