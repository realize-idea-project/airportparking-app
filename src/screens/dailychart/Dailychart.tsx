import React, { useState, useEffect } from 'react';
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
import SendSMS from 'react-native-sms';
import { loadDailyChartList } from '../../apis';
import { DailychartProtocol } from './protocols';
import { DatePicker } from './DatePicker';
import { DailyChartList } from './DailyChartList';
import { useContactPermission } from './useContactPermission';
import { useAcessContact } from './useAccessContacts';
import { useSMS } from './useSMS';

import { Modal } from '../../components/Modals/Modal';
import { ServiceInModalContents } from './ServiceInModalContents';

const screenHeight = Dimensions.get('window').height;
const SERVICE_IN = '입고';

const DailyChart = () => {
  const [reservationList, setReservationList] = useState<DailychartProtocol[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { permissionStatus, requestPermissions } = useContactPermission();
  const { generateContacts, saveBulkContact } = useAcessContact();
  const { openSmsApp } = useSMS();

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (_.isEmpty(reservationList)) {
        return false;
      } else {
        setReservationList([]);
        setSelectedDate(formatDate(new Date()));
        return true;
      }
    });

    return () => listener.remove();
  }, [reservationList]);

  useEffect(() => {
    if (!_.isEmpty(reservationList)) {
      requestPermissions();
    }
  }, [reservationList]);

  const changeDate = (targetDate: Date) => {
    const formattedDate = formatDate(new Date(targetDate));
    setSelectedDate(formattedDate);
  };

  const LoadChart = async (date: string) => {
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

  const resetChart = () => {
    setReservationList([]);
    setSelectedDate(formatDate(new Date()));
  };

  const saveMobileNumbers = async () => {
    if (!isLoading && permissionStatus === 'granted') {
      setIsLoading(true);
      const newContactsList = generateContacts(reservationList, selectedDate);
      await saveBulkContact(newContactsList);
      Alert.alert('번호 저장이 완료되었습니다.');
      setIsLoading(false);
    }
  };

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const sendSmsAll = () => {
    showLoading();
    const serviceInUsers = getServiceInUserlist(reservationList);

    try {
      openSmsApp(serviceInUsers, hideLoading);
    } catch (e) {
      hideLoading();
    }
  };

  const sendSmsWithPic = () => {};

  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <Pressable style={styles.goBack} onPress={resetChart}>
            <Text style={styles.backText}>뒤로 가기</Text>
          </Pressable>
          <Text style={styles.headerText}>일일 주차 예약 목록</Text>
        </View>
        {_.isEmpty(reservationList) ? (
          <DatePicker selectedDate={selectedDate} changeDate={changeDate} onClickLoadButton={LoadChart} />
        ) : (
          <DailyChartList
            selectedDate={selectedDate}
            list={reservationList}
            onClickReset={resetChart}
            onClickSave={saveMobileNumbers}
            onClickSendAll={sendSmsAll}
            onClickSendWithPic={sendSmsWithPic}
          />
        )}

        {isLoading && (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" style={styles.indicator} />
          </View>
        )}
        {/* <Modal contents={() => <ServiceInModalContents />} /> */}
      </View>
    </SafeAreaView>
  );
};

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const getServiceInUserlist = (wholeList: DailychartProtocol[]) => {
  return wholeList
    .filter((user) => user.serviceType === SERVICE_IN)
    .map((user) => user.contactNumber)
    .map((contact) => contact.split('-'))
    .map((contact) => contact.reduce((acc, cur) => `${acc}${cur}`));
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
  goBack: {
    position: 'absolute',
    left: 20,
  },
  backText: {
    fontSize: 14,
    color: 'black',
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
  },
});

export default DailyChart;
