import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import DailyChart from '../screens/DailychartDep/Dailychart';
import DatePicker from '../screens/DatePicker';
import DailyChart from '../screens/DailyChart';

/**
 * DailyChartNavigationProps의 key는
 * DailyChartNavigationDefinition.routes 속의 name 프로퍼티와
 * 1:1로 매치 되어야한다.
 */

type NavigationStackProps = {
  DatePicker: undefined;
  DailyChart: { selectedDate: string };
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
