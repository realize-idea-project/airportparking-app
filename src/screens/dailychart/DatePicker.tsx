import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';
import _ from 'lodash';

const delay = 1000;

interface Props {
  selectedDate: string;
  changeDate: (date: Date) => void;
  onClickLoadButton: (date: string) => void;
}

export const DatePicker: FC<Props> = ({ selectedDate, changeDate, onClickLoadButton }) => {
  const handleClickLoadButton = useCallback(
    _.throttle(() => {
      onClickLoadButton(selectedDate);
    }, delay),
  [selectedDate]);

  return (
    <View>
      <View style={{ height: 30 }}/>
      <View>
        <CalendarPicker onDateChange={changeDate as unknown as DateChangedCallback}/>
      </View>
      <View style={{ height: 30 }}/>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{`${selectedDate}`}</Text>
      </View>
      <View style={{ height: 30 }}/>
      <Pressable style={styles.button} onPress={handleClickLoadButton}>
        <Text style={styles.buttonText}>목록 가져오기</Text>
      </Pressable>
      
    </View>
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
  }
});