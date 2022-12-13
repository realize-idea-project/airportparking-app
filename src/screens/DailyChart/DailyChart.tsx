import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, View, BackHandler } from 'react-native';
import _ from 'lodash';

import { CustomNavigationType } from '../../navigations';
import { confirmAlert, noticeAlert } from '../../utils';
import { HeaderWithGoback } from '../../components/Header';
import { Modal } from '../../components/Modals';
import { LoadingSpinner } from '../../components/Spinner';

import { useContact, useMessage, useReservation } from './hooks';
import { DailyChartList, UserSearchModalContents, ControlButtons } from './component';

interface Props {
  navigation: CustomNavigationType<'DailyChart', 'navigation'>;
  route: CustomNavigationType<'DailyChart', 'route'>;
}

const SERVICE_IN = true;

export const DailyChart: FC<Props> = ({ navigation, route }) => {
  const { sendMMS, sendSmsByServiceType, getMMSPhoto, sendAdvertiseSMS } = useMessage();
  const { saveContactNumbers } = useContact();
  const { reservationList, getContactNumberByServiceType, generateContactFormat, getSelectedUserDetail } =
    useReservation(route.params);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showModal) {
        closeInputPlateNumberModal();
        return true;
      }
    });
    return () => listener.remove();
  }, [showModal]);

  const sendServiceMessageByType = (isServiceIn: boolean) => async () => {
    
    if (!isLoading) {
      showLoading();
      const title = isServiceIn ? '<입고>' : '<출고>';
      const message = isServiceIn ? '입고 손님에게 문자를 보내시겠습니까?' : '출고 손님에게 문자를 보내시겠습니까?';
      const confirmText = '보내기';
      const onConfirm = async () => {
        const contactList = getContactNumberByServiceType(isServiceIn).filter((mobile) => !_.isEmpty(mobile));
        await sendSmsByServiceType(contactList, isServiceIn, hideLoading);
      };

      confirmAlert({ title, message, confirmText, onConfirm });
    }
  };

  const sendAdvertiseMessage = () => {
    if (!isLoading) {
      showLoading();
      const title = '<입고>';
      const message = '입고 손님에게 광고 문자를 보내시겠습니까?' ;
      const confirmText = '보내기';
      const onConfirm = async () => {
        const contactList = getContactNumberByServiceType(true);
        await sendAdvertiseSMS(contactList, true, hideLoading);
      };

      confirmAlert({ title, message, confirmText, onConfirm });
    }
    
  }

  const saveContactOnMobile = async () => {
    if (isLoading) return;

    showLoading();
    const contactsList = generateContactFormat();
    const isSuccess = await saveContactNumbers(contactsList);
    hideLoading();

    const message = isSuccess ? '번호 저장이 완료되었습니다.' : '번호 저장에 실패하였습니다.';
    noticeAlert({ message });
  };

  const takeMMSPhoto = async () => {
    const isSucceess = await getMMSPhoto();

    if (isSucceess) {
      openInputPlateNumberModal();
    } else {
      noticeAlert({ message: '사진 촬영이 실패하였습니다.' });
    }
  };

  const sendMMSWithPhoto = async (plateNumber: string) => {
    const selectedUser = getSelectedUserDetail(plateNumber);

    if (!_.isEmpty(selectedUser) && !_.isNil(selectedUser)) {
      const message = `안녕하세요 김포공항 주차대행입니다.\n고객님의 ${selectedUser?.plateNumber} 차량 안전하게 주차하였습니다.\n김포공항에 돌아와서 연락 부탁드리겠습니다.\n즐거운 여행되세요 :)`;
      await sendMMS(selectedUser.contactNumber, message);
      closeInputPlateNumberModal();
    } else {
      noticeAlert({ message: '일치하는 차량번호가 없습니다. 다시 한번 확인해주세요.' });
      return;
    }
  };

  

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const openInputPlateNumberModal = () => setShowModal(true);
  const closeInputPlateNumberModal = () => setShowModal(false);

  const goPreviousScreen = () => navigation.pop();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithGoback text="일일 주차 예약 목록" onClickLeftComponent={goPreviousScreen} leftComponent />
      <View style={{ height: 10 }} />
      <ControlButtons
        onClickSendServiceInMessage={sendServiceMessageByType(SERVICE_IN)}
        onClickSaveContact={saveContactOnMobile}
        onClickSendServiceOutMessage={sendServiceMessageByType(!SERVICE_IN)}
        onClickSendMMS={takeMMSPhoto}
        onClickAdvertiseSMS={sendAdvertiseMessage}
      />
      <View style={{ height: 15 }} />
      <DailyChartList list={reservationList} />

      {isLoading && <LoadingSpinner />}
      {showModal && (
        <Modal
          contents={() => (
            <UserSearchModalContents onClickFindButton={sendMMSWithPhoto} onClickClose={closeInputPlateNumberModal} />
          )}
        />
      )}
    </SafeAreaView>
  );
};
