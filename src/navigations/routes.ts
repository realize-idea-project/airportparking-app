import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DatePicker from '../screens/DatePicker';
import DailyChart from '../screens/TEMP';
import { Reservation } from '../shared/types/Reservation';

/**
 * DailyChartNavigationProps의 key는
 * DailyChartNavigationDefinition.routes 속의 name 프로퍼티와
 * 1:1로 매치 되어야한다.
 */

type NavigationStackProps = {
  DatePicker: undefined;
  DailyChart: { reservationList: Reservation[]; selectedDate: string };
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

const DailyChartNavigationDefinition = {
  id: 'DailyChart',
  routes: [
    { name: 'DatePicker', component: DatePicker, options: {} },
    { name: 'DailyChart', component: DailyChart, options: { gestureEnabled: false } },
  ],
};

export const navigationDefinitions = [DailyChartNavigationDefinition];
export type CustomNavigationType<
  T extends keyof NavigationStackProps,
  M extends 'navigation' | 'route',
> = NativeStackScreenProps<NavigationStackProps, T>[M];
