import React from 'react';
import Config from 'react-native-config';
import AppNavigationProvider from './navigations/provider';

const App = () => {
  console.log(Config.ENV);
  return <AppNavigationProvider />;
};

export default App;
