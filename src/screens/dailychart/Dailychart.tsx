import React, { FC, useState, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { confirmAlert, DATE_LENGTH_FOR_CHART } from '../../utils';
import { loadDailyChartList } from '../../apis';

import { DailychartProtocol } from './protocols';
import { DailyChartScreen } from './DailyChartScreen';

interface Props {
  navigation: CustomNavigationType<'DailyChart', 'navigation'>;
  route: CustomNavigationType<'DailyChart', 'route'>;
}

export const DailyChart: FC<Props> = ({ navigation, route }) => {
  const [reservationList, setReservationList] = useState<DailychartProtocol[]>([]);
  const isLoading = useRef(false);

  const { selectedDate } = route.params;

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => false);
    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (validateSelectedDate(selectedDate)) {
      LoadChart(selectedDate);
    } else {
      moveToDatePickerWithAlert('날짜가 잘못 선택되었습니다. 날짜를 다시 선택해주세요.');
    }
  }, [selectedDate]);

  const LoadChart = async (date: string) => {
    try {
      if (!isLoading.current) {
        isLoading.current = true;
        const list = await loadDailyChartList(date);

        if (_.isEmpty(list)) {
          moveToDatePickerWithAlert('해당 날짜에 예약이 없습니다. 날짜를 확인해주세요.');
        } else {
          setReservationList(list);
          isLoading.current = false;
        }
      }
    } catch (e) {
      moveToDatePickerWithAlert('리스트 로딩 중에 문제가 발생하였습니다. 날짜를 다시 선택해주세요.');
    }
  };

  const moveToDatePickerWithAlert = (message: string) => {
    confirmAlert({
      message,
      onConfirm: () => {
        navigation.navigate('DatePicker');
      },
    });
  };

  return <DailyChartScreen navigation={navigation} reservationList={reservationList} />;
};

const validateSelectedDate = (selectedDate: string) => {
  return !_.isEmpty(selectedDate) && selectedDate.length === DATE_LENGTH_FOR_CHART;
};
