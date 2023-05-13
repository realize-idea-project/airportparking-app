import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationDefinitions } from './routes';

import _ from 'lodash';

const AppNavigation = {
  Stack: createNativeStackNavigator(),
  navigatorOptions: {
    screenOptions: { headerShown: false },
    initialRouteName: 'AppStart',
  },
  routes: _.flatMap(navigationDefinitions, ({ routes }) => routes),
};

const AppNavigationProvider = () => {
  const { Stack, navigatorOptions, routes } = AppNavigation;

  return (
    <NavigationContainer>
      <Stack.Navigator {...navigatorOptions}>
        {routes.map(({ name, component, options }) => (
          <Stack.Screen key={name} name={name} component={component} options={options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationProvider;
