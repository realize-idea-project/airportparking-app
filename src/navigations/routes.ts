import { FC } from 'react';
import DailyChart from '../screens/Dailychart/Dailychart';

interface ScreenDefinition {
  id: string;
  routes: Screen[];
}
interface Screen {
  name: string;
  component: FC<any>;
  options?: any;
}

const DailyChartNavigationDefinition = {
  id: 'DailyChart',
  routes: [{ name: 'DailyChart', component: DailyChart, options: {} }],
};

export const navigationDefinitions: ScreenDefinition[] = [DailyChartNavigationDefinition];
