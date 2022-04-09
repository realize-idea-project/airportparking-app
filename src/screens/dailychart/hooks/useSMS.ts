import _ from 'lodash';
import SendSMS from 'react-native-sms';

import Share from 'react-native-share';

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

  const openSmsAppWithPic = async (mobile: string, message: string, imageInBase64: string) => {
    if (_.isEmpty(mobile) || _.isEmpty(imageInBase64)) return;

    const res = await Share.shareSingle({
      message,
      url: `data:image/jpg;base64,${imageInBase64}`,
      recipient: mobile,
      social: Share.Social.SMS,
    });

    return res;
  };

  return { openSmsApp, openSmsAppWithPic };
};
