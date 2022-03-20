import React from 'react';
import Config from 'react-native-config';
import { StyleSheet, SafeAreaView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DailyChart from './screens/Dailychart/Dailychart';
import ServiceIn from './screens/ServiceIn/ServiceIn';

const Tab = createBottomTabNavigator();

const App = () => {
  console.log(Config.ENV);
  return (
    <SafeAreaView>
      <DailyChart />
    </SafeAreaView>
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
