import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { loadDailyChartList } from '../../apis';
import { DailychartProtocol } from './protocols';
import { DatePicker } from './DatePicker';
import { DailyChartList } from './DailyChartList';
import { useContactPermission } from './useContactPermission';
import { useAcessContact } from './useAccessContacts';

const screenHeight = Dimensions.get("window").height;

const DailyChart = () => {
  const [reservationList, setReservationList] = useState<DailychartProtocol[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(false);

  const { permissionStatus, requestPermissions } = useContactPermission();
  const { generateContacts, saveBulkContact, deleteAllContacts } = useAcessContact();

  useEffect(() => {
    if (!_.isEmpty(reservationList)) {
      requestPermissions();
    }
  }, [reservationList])
  
  const changeDate = (targetDate: Date) => {
    const formattedDate = formatDate(new Date(targetDate));
    setSelectedDate(formattedDate);
  };

  const onClickLoadButton = async (date: string) => {  
    try {
      if (!isLoading) {
        setIsLoading(true);
        const list = await loadDailyChartList(date);
        
        if (_.isEmpty(list)) {
          Alert.alert('해당 날짜에 예약이 없습니다. 날짜를 확인해주세요.');
          setIsLoading(false);
          return;
        }
  
        setReservationList(list);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const onClickReset = () => {
    setReservationList([]);
    setSelectedDate(formatDate(new Date()));
  };

  const onClickSaveButton = async () => {
    if (!isLoading && permissionStatus === 'granted') {
      setIsLoading(true);
      const newContactsList = generateContacts(reservationList, selectedDate);
      await saveBulkContact(newContactsList);
      Alert.alert('번호 저장이 완료되었습니다.');
      setIsLoading(false);
    }
  };

  const onClickDeleteButton = async () => {
    if (!isLoading && permissionStatus === 'granted') {
      setIsLoading(true);
      await deleteAllContacts(selectedDate);
      Alert.alert('번호 삭제가 완료되었습니다.');
      setIsLoading(false);
    }
  };
  
  return (   
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>일일 주차 예약 목록</Text>
      </View>
      {_.isEmpty(reservationList) ? (
        <DatePicker 
          selectedDate={selectedDate}
          changeDate={changeDate} 
          onClickLoadButton={onClickLoadButton}
        />
      ) : (
        <DailyChartList
          selectedDate={selectedDate}
          list={reservationList}
          onClickReset={onClickReset}
          onClickSave={onClickSaveButton}
          onClickDelete={onClickDeleteButton}
        />
      )}
      
      {isLoading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size='large' style={styles.indicator} />
        </View>
      )}
      
    </View>
  );
};

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  loadingView: { 
    position: 'absolute',
    height: screenHeight,
    width: '100%',
    zIndex: 10,
    backgroundColor: '#bbbbbb',
    opacity: 0.8,
  },
  indicator: {
    top: '40%',
    
  }
});

export default DailyChart;
