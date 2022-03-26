import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  text: string;
}

export const MainHeader: FC<Props> = ({ text }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
});
