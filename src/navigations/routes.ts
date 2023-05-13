import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DatePicker from '../screens/DatePicker';
import DailyChart from '../screens/DailyChart';
import UpdateChart from '../screens/UpdateDailyChart';
import Login from '../screens/Login';
import AppStart from '../screens/AppStart';
import InactiveUser from '../screens/InactiveUser';

import { Reservation } from '../shared/types/Reservation';

/**
 * DailyChartNavigationProps의 key는
 * DailyChartNavigationDefinition.routes 속의 name 프로퍼티와
 * 1:1로 매치 되어야한다.
 */

type NavigationStackProps = {
  DatePicker: undefined;
  DailyChart: { reservationList: Reservation[]; selectedDate: string };
  UpdateChart: { reservation: Reservation; rowNo: number };
  Login: undefined;
  AppStart: undefined;
  InactiveUser: undefined;
};

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthNavigationDefinition = {
  id: 'Auth',
  routes: [
    { name: 'Login', component: Login, options: {} },
    { name: 'AppStart', component: AppStart, options: {} },
    { name: 'InactiveUser', component: InactiveUser, options: {} },
  ],
};

const DailyChartNavigationDefinition = {
  id: 'DailyChart',
  routes: [
    { name: 'DatePicker', component: DatePicker, options: {} },
    { name: 'DailyChart', component: DailyChart, options: { gestureEnabled: false } },
    { name: 'UpdateChart', component: UpdateChart, options: {} },
  ],
};

export const navigationDefinitions = [DailyChartNavigationDefinition, AuthNavigationDefinition];
export type CustomNavigationType<
  T extends keyof NavigationStackProps,
  M extends 'navigation' | 'route',
> = NativeStackScreenProps<NavigationStackProps, T>[M];
