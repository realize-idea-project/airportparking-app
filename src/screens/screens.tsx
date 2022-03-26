import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DailyChart from './Dailychart/Dailychart';
import { DatePicker } from './Dailychart/DatePicker';
import _ from 'lodash';

interface ScreenDefinition {
  id: string;
  routes: Screen[];
}
interface Screen {
  name: string;
  component: FC<any>;
  options?: any;
}

const DailyChartScreenDefinition = {
  id: 'DailyChart',
  routes: [
    { name: 'DailyChart', component: DailyChart, options: {} },
    { name: 'DatePicker', component: DatePicker, options: {} },
  ],
};

const screenDefinitions: ScreenDefinition[] = [DailyChartScreenDefinition];

const AppNavigation = {
  Stack: createNativeStackNavigator(),
  navigatorOptions: {
    screenOptions: { headerShown: false },
    initialRouteName: 'DatePicker',
  },
  routes: _.flatMap(screenDefinitions, ({ routes }) => routes),
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
