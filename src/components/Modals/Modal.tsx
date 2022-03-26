import React, { FC } from 'react';
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

interface ModalProps {
  contents: any;
}

const screenHeight = Dimensions.get('window').height;

export const Modal: FC<ModalProps> = ({ contents }) => {
  return (
    <>
      <View style={styles.background} />
      {contents()}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
  },
});
