import React from 'react';
import Config from 'react-native-config';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DailyChart from './screens/Dailychart/Dailychart';
import ServiceIn from './screens/ServiceIn/ServiceIn';

const Tab = createBottomTabNavigator();

const App = () => {
  console.log(Config.ENV);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="DailyChart"
          component={DailyChart}
          options={{
            tabBarActiveBackgroundColor: 'rgb(44, 61, 105)',
            tabBarActiveTintColor: 'white',
            headerShown: false,
            tabBarLabel: '일일 주차 목록',
            tabBarLabelStyle: {
              fontSize: 20,
              alignContent: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              fontWeight: '700',
            },
            tabBarIcon: () => null,
          }}
        />
        <Tab.Screen
          name="ServiceIn"
          component={ServiceIn}
          options={{
            tabBarActiveBackgroundColor: 'rgb(44, 61, 105)',
            tabBarActiveTintColor: 'white',
            headerShown: false,
            tabBarLabel: '입고 문자',
            tabBarLabelStyle: {
              fontSize: 20,
              alignContent: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              fontWeight: '700',
            },
            tabBarIcon: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
