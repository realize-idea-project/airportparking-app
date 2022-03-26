import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DailyChart from './Dailychart/Dailychart';

interface ScreenDefinition {
  id: string;
  Stack: any;
  screenOptions?: any;
  routes: Screen[];
}

interface Screen {
  name: string;
  component: FC<any>;
  options?: any;
}

const DailyChartScreenDefinition: ScreenDefinition = {
  id: 'DailyChart',
  Stack: createNativeStackNavigator(),
  screenOptions: { headerShown: false },
  routes: [{ name: 'DailyChart', component: DailyChart, options: {} }],
};

const screenDefinitions = [DailyChartScreenDefinition];
const AppNavigationProvider = () => {
  return (
    <NavigationContainer>
      {screenDefinitions.map(({ id, Stack, routes, screenOptions }) => (
        <Stack.Navigator key={id} screenOptions={screenOptions}>
          {routes.map(({ name, component, options }) => (
            <Stack.Screen key={name} name={name} component={component} options={options} />
          ))}
        </Stack.Navigator>
      ))}
    </NavigationContainer>
  );
};

export default AppNavigationProvider;
