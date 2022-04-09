import React, { FC } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import _ from 'lodash';

interface Props {
  text: string;
  onClickLeftComponent?: () => void;
  leftComponent?: boolean;
}

export const HeaderWithGoback: FC<Props> = ({ text, onClickLeftComponent, leftComponent = false }) => {
  const showLeftComponent = !_.isNil(onClickLeftComponent) && leftComponent;
  return (
    <View>
      <View style={styles.header}>
        {showLeftComponent && <LeftComponent onClick={onClickLeftComponent} />}
        <Text style={styles.headerText}>{text}</Text>
      </View>
    </View>
  );
};

const LeftComponent: FC<any> = ({ onClick }) => {
  return (
    <Pressable style={styles.goBack} onPress={onClick}>
      <Text style={styles.backText}>뒤로 가기</Text>
    </Pressable>
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
  goBack: {
    position: 'absolute',
    left: 20,
  },
  backText: {
    fontSize: 14,
    color: 'black',
  },
});
