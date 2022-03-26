import _ from 'lodash';
import SendSMS from 'react-native-sms';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const ServiceInAllMessage = '김포공항 주차대행 입니다 국내선 출발 2층 1번 게이트로 오세요 도착 10분전에 전화주세요';

export const useSMS = () => {
  const openSmsApp = (mobiles: string[], cb?: () => void) => {
    if (_.isEmpty(mobiles)) return;

    SendSMS.send(
      {
        body: ServiceInAllMessage,
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
