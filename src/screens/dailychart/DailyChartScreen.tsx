import React, { FC, useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  BackHandler,
  Pressable,
} from 'react-native';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { DailychartProtocol } from './protocols';

interface Props {
  navigation: CustomNavigationType<'DailyChart', 'navigation'>;
  reservationList: DailychartProtocol[];
}

export const DailyChartScreen: FC<Props> = ({ navigation, reservationList }) => {
  return null;
};
