import { Alert } from 'react-native';

export const confirmAlert = ({ title = '', message = '', confirmText = '확인', onConfirm = () => {} }) => {
  Alert.alert(title, message, [
    {
      text: confirmText,
      onPress: onConfirm,
    },
  ]);
};

export const noticeAlert = ({ title = '', message = '' }) => {
  Alert.alert(title, message);
};
