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
import { launchCamera } from 'react-native-image-picker';
import { loadDailyChartList } from '../../apis';
import { DailychartProtocol } from './protocols';
import { alertMessages, globalTextString, SERVICE_IN, SERVICE_OUT } from './constants';

import { DatePicker, DailyChartList } from './component';
import { usePermission, useAcessContact, useSMS } from './hooks';

const screenHeight = Dimensions.get('window').height;

const DailyChart = () => {
  const [reservationList, setReservationList] = useState<DailychartProtocol[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { requestPermissions } = usePermission();
  const { generateContacts, saveBulkContact, permissionsForContact } = useAcessContact();
  const { openSmsApp, openSmsAppWithPic } = useSMS();

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
          Alert.alert(alertMessages.noReservation);
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
    const isPermissionAccepted = await requestPermissions(permissionsForContact);

    if (!isLoading && isPermissionAccepted) {
      setIsLoading(true);
      const newContactsList = generateContacts(reservationList, selectedDate);
      await saveBulkContact(newContactsList);
      Alert.alert(alertMessages.doneSavingMobiles);
      setIsLoading(false);
    }
  };

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const handlerClickSendSmsToServiceInUser = () => {
    Alert.alert(alertMessages.sendServiceInMessageTitle, alertMessages.sendServiceInMessage, [
      {
        text: globalTextString.cancel,
        onPress: () => null,
        style: 'cancel',
      },
      { text: globalTextString.send, onPress: sendSmsToServiceInUser },
    ]);
  };

  const sendSmsToServiceInUser = () => {
    showLoading();
    const serviceInUsers = getUserListByServiceType(reservationList, SERVICE_IN);
    try {
      openSmsApp(SERVICE_IN, serviceInUsers, hideLoading);
    } catch (e) {
      hideLoading();
    }
  };

  const handlerClickSendSmsToServiceOutUser = () => {
    Alert.alert(alertMessages.sendServiceOutMessageTitle, alertMessages.sendServiceOutMessage, [
      {
        text: globalTextString.cancel,
        onPress: () => null,
        style: 'cancel',
      },
      { text: globalTextString.send, onPress: sendSmsToServiceOutUser },
    ]);
  };

  const sendSmsToServiceOutUser = () => {
    showLoading();
    const serviceOutUsers = getUserListByServiceType(reservationList, SERVICE_OUT);

    try {
      openSmsApp(SERVICE_OUT, serviceOutUsers, hideLoading);
    } catch (e) {
      hideLoading();
    }
  };

  const sendSmsWithPic = async () => {
    const { mobile, plateNumber } = getUserByPlateNumber(reservationList, '3188');
    const message = `안녕하세요 김포공항 주차대행입니다.\n고객님의 ${plateNumber} 차량 안전하게 주차하였습니다.\n김포공항에 돌아와서 연락 부탁드리겠습니다.\n즐거운 여행되세요 :)`;
    const photoInBase64 = await getPhotoWithBase64();

    if (photoInBase64) {
      await openSmsAppWithPic(mobile, message, photoInBase64);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          {!_.isEmpty(reservationList) && (
            <Pressable style={styles.goBack} onPress={resetChart}>
              <Text style={styles.backText}>뒤로 가기</Text>
            </Pressable>
          )}
          <Text style={styles.headerText}>일일 주차 예약 목록</Text>
          <Pressable onPress={sendSmsWithPic} style={{ height: 30 }}>
            <Text>test</Text>
          </Pressable>
        </View>

        {_.isEmpty(reservationList) ? (
          <DatePicker selectedDate={selectedDate} changeDate={changeDate} onClickLoadButton={LoadChart} />
        ) : (
          <DailyChartList
            selectedDate={selectedDate}
            list={reservationList}
            onClickReset={resetChart}
            onClickSave={saveMobileNumbers}
            onClickSendServiceInMessage={handlerClickSendSmsToServiceInUser}
            onClickSendServiceOutMessage={handlerClickSendSmsToServiceOutUser}
            onClickSendWithPic={sendSmsWithPic}
          />
        )}

        {isLoading && (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" style={styles.indicator} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const getUserListByServiceType = (wholeList: DailychartProtocol[], serviceType: string) => {
  return wholeList
    .filter((user) => user.serviceType === serviceType)
    .map((user) => user.contactNumber)
    .map((contact) => contact.split('-'))
    .map((contact) => contact.reduce((acc, cur) => `${acc}${cur}`));
};

const getUserByPlateNumber = (wholeList: DailychartProtocol[], plateNumberHint: string) => {
  const targetUser = wholeList.filter((user) => _.includes(user.plateNumber, plateNumberHint));

  const mobile = targetUser
    .map((user) => user.contactNumber)
    .map((contact) => contact.split('-'))
    .map((contact) => contact.reduce((acc, cur) => `${acc}${cur}`))?.[0];

  const { plateNumber } = targetUser?.[0];

  return { mobile, plateNumber };
};

const getPhotoWithBase64 = async () => {
  const photo = await launchCamera({
    mediaType: 'photo',
    quality: 0.5,
    includeBase64: true,
  });

  return photo.assets?.[0].base64;
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
