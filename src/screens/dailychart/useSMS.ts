import _ from 'lodash';
import SendSMS from 'react-native-sms';

export const useSMS = () => {
  const openSmsApp = (mobiles: string[], cb: () => void) => {
    if (_.isEmpty(mobiles)) return;

    SendSMS.send(
      {
        body: '김포공항 주차대행 입니다 국내선 출발 2층 1번 게이트로 오세요 도착 10분전에 전화주세요',
        recipients: mobiles,
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        cb();
      },
    );
  };

  return { openSmsApp };
};
