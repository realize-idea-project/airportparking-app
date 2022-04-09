import _ from 'lodash';
import SendSMS from 'react-native-sms';
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

  const openSmsAppWithPic = (mobiles: string[], imageMeta: any, cb?: () => void) => {
    if (_.isEmpty(mobiles) || _.isEmpty(imageMeta)) return;

    const attachment = {
      url: imageMeta.uri,
      androidType: imageMeta.type,
      // iosType: 'public.jpeg',
      // iosFilename: 'Image.jpeg',
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
