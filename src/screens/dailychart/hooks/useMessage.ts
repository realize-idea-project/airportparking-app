import { useRef } from 'react';
import { Platform } from 'react-native';
import SendSMS from 'react-native-sms';
import Share from 'react-native-share';

import _ from 'lodash';

import { ImagePickerResponse } from 'react-native-image-picker';
import { useCameraPicker } from '../../../shared/hooks/useCameraPicker';

const isAndroid = Platform.OS === 'android';

export const useMessage = () => {
  const image = useRef<ImagePickerResponse | string | undefined>();
  const { getPhoto, getPhtoInBase64 } = useCameraPicker();

  const sendSmsByServiceType = async (contactNumbers: string[], isServiceIn: boolean, cb?: () => void) => {
    const message = isServiceIn
      ? '김포공항 주차대행 입니다 국내선 출발 2층 1번 게이트로 오세요 도착 10분전에 전화주세요'
      : '김포공항 주차대행 입니다';

    const formattedNumbers = contactNumbers.map(deleteDashFromContact);

    await SendSMS.send(
      {
        body: message,
        recipients: formattedNumbers,
        successTypes: ['sent', 'queued'] as any,
        allowAndroidSendWithoutReadPermission: true,
      },

      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        cb && cb();
      },
    );
  };

  const sendMMS = async (contactNumber: string, message: string) => {
    if (_.isNil(image.current)) return false;

    const formattedNumber = deleteDashFromContact(contactNumber);

    return isAndroid
      ? await sendMmsAndroid(formattedNumber, message, image.current as string | undefined)
      : await sendMmsIos(formattedNumber, message, image.current as ImagePickerResponse);
  };

  const sendMmsAndroid = async (contactNumber: string, message: string, photo: string | undefined) => {
    if (_.isEmpty(contactNumber) || _.isEmpty(photo)) return false;

    try {
      const res = await Share.shareSingle({
        message,
        url: `data:image/jpg;base64,${photo}`,
        recipient: contactNumber,
        social: Share.Social.SMS,
      });

      return true;
    } catch (e) {
      console.error('send mms in aos is failed', e);
      return false;
    }
  };

  const sendMmsIos = async (contactNumber: string, message: string, photo: ImagePickerResponse, cb?: () => void) => {
    if (_.isEmpty(photo.assets) || _.isNil(photo.assets?.[0].uri)) return false;

    const attachment = {
      url: photo.assets?.[0].uri as string,
      iosType: photo.assets?.[0].type,
      iosFilename: photo.assets?.[0].fileName,
    };

    await SendSMS.send(
      {
        body: message,
        recipients: [contactNumber],
        successTypes: ['sent', 'queued'] as any,
        allowAndroidSendWithoutReadPermission: true,
        attachment,
      },
      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        cb && cb();
      },
    );
  };

  const getMMSPhoto = async () => {
    try {
      const result = isAndroid ? await getPhtoInBase64() : await getPhoto();
      image.current = result;
      return !_.isEmpty(result);
    } catch (e) {
      return false;
    }
  };

  return {
    sendSmsByServiceType,
    getMMSPhoto,
    sendMMS,
  };
};

const deleteDashFromContact = (contactNumber: string) => contactNumber.split('-').reduce((acc, cur) => `${acc}${cur}`);
