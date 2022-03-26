import React from 'react';
import Config from 'react-native-config';

import AppNavigationProvider from './screens/screens';

const App = () => {
  console.log(Config.ENV);
  return <AppNavigationProvider />;
};

export default App;
