import _ from 'lodash';
import SendSMS from 'react-native-sms';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { SERVICE_IN, SmsMessage } from '../constants';

export const useSMS = () => {
  const openSmsApp = (type: string, mobiles: string[], cb?: () => void) => {
    if (_.isEmpty(mobiles)) return;

    const message = type === SERVICE_IN ? SmsMessage.serviceIn : SmsMessage.serviceOut;

    SendSMS.send(
      {
        body: message,
        recipients: mobiles,
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        cb && cb();
      },
    );
  };

  const openSmsAppWithPic = (mobiles: string[], image: any, cb?: () => void) => {
    if (_.isEmpty(mobiles) || _.isEmpty(image)) return;

    const metadata = resolveAssetSource(image.assets[0]);
    console.log(metadata);

    const attachment = {
      url: metadata.uri,
      // iosType: 'public.jpeg',
      // iosFilename: 'Image.jpeg',
      androidType: image.assets[0].type,
    };

    SendSMS.send(
      {
        body: 'The default body of the SMS!',
        recipients: ['01097192118'],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
        attachment: attachment,
      },
      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        cb && cb();
      },
    );
  };

  return { openSmsApp, openSmsAppWithPic };
};
