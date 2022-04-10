import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const LoadingSpinner = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    height: screenHeight,
    width: '100%',
    zIndex: 10,
    backgroundColor: '#bbbbbb',
    opacity: 0.8,
  },
  indicator: {
    top: '40%',
  },
});
