import React, { FC, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { DATE_LENGTH_FOR_CHART, formatDate, noticeAlert } from '../../utils';

import { HeaderWithGoback } from '../../components/Header';

const delay = 1000;
const KOREAN_MONTH = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const KOREAN_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const PREVIOUS_MONTH = '이전';
const NEXT_MONTH = '다음';

interface Props {
  navigation: CustomNavigationType<'DatePicker', 'navigation'>;
}

export const DatePicker: FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const changeDate = (targetDate: Date) => {
    const formattedDate = formatDate(new Date(targetDate));
    setSelectedDate(formattedDate);
  };

  const handleClickLoadButton = useCallback(
    _.throttle(() => {
      if (!_.isEmpty(selectedDate) && selectedDate.length === DATE_LENGTH_FOR_CHART) {
        navigation.navigate('DailyChart', { selectedDate });
      } else {
        noticeAlert({ message: '날짜가 잘못 선택되었습니다. 날짜를 다시 선택해주세요.' });
      }
    }, delay),
    [selectedDate],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithGoback text="날짜 선택" />
      <View style={{ height: 30 }} />
      <View>
        <CalendarPicker
          onDateChange={changeDate as unknown as DateChangedCallback}
          weekdays={KOREAN_DAYS}
          months={KOREAN_MONTH}
          previousTitle={PREVIOUS_MONTH}
          nextTitle={NEXT_MONTH}
        />
      </View>
      <View style={{ height: 30 }} />
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{`${selectedDate}`}</Text>
      </View>
      <View style={{ height: 30 }} />
      <Pressable style={styles.button} onPress={handleClickLoadButton}>
        <Text style={styles.buttonText}>목록 가져오기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dddddd',
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
  },
});
