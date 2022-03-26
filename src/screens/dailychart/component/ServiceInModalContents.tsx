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

export const ServiceInModalContents = () => {
  return (
    <>
      <View style={[styles.containerPosition, styles.containerShape]}>
        <Text>h</Text>
        <Text>h</Text>
        <Text>h</Text>
        <Text>h</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerPosition: {
    position: 'absolute',
    top: '50%',
    left: '14%',

    zIndex: 3,
  },
  containerShape: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
