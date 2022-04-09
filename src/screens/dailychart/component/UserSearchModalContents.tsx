import _ from 'lodash';
import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, View, Alert, Pressable, TextInput, Platform } from 'react-native';

interface Props {
  onClickFindButton: (plateNumber: string) => Promise<void>;
  onClickClose: () => void;
}

const MAX_LENGTH = 4;

const isAndroid = Platform.OS === 'android';

export const UserSearchModalContents: FC<Props> = ({ onClickFindButton, onClickClose }) => {
  const [plateNumber, setPlateNumber] = useState<string>('');
  const buttonLock = useRef(false);

  const handleInput = (text: string) => {
    if (text.length <= MAX_LENGTH && !_.isNaN(Number(text))) {
      setPlateNumber(text);
    }
  };

  const clickButton = async () => {
    if (plateNumber.length !== MAX_LENGTH) {
      Alert.alert('4자리 숫자를 입력해주세요.');
      return;
    }
    if (buttonLock.current === true) return;
    buttonLock.current = true;

    try {
      await onClickFindButton(plateNumber);
      buttonLock.current = false;
    } catch (e) {
      console.error(e);
      Alert.alert('사진 전송에 실패하였습니다.');
      buttonLock.current = false;
      throw e;
    }
  };

  return (
    <>
      <View style={[styles.containerPosition, styles.containerShape]}>
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable onPress={onClickClose}>
            <Text style={{ fontSize: 20, color: 'black' }}>닫기</Text>
          </Pressable>
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.mainTitle}>차량번호 4자리를 입력해주세요</Text>
        <View style={{ height: 10 }} />
        <Text style={styles.guideText}>예) '32호 1992' 👉 '1992' 입력</Text>
        <View style={{ height: 30 }} />
        <TextInput style={styles.plateInput} onChangeText={handleInput} value={plateNumber} />
        <View style={{ height: 20 }} />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={clickButton}>
            <Text style={styles.buttonText}>메세지 보내기</Text>
          </Pressable>
        </View>
        <View style={{ height: 10 }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerPosition: {
    position: 'absolute',
    top: '28%',
    left: isAndroid ? '8%' : '3.5%',
    zIndex: 3,
  },
  containerShape: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 24,
    color: 'black',
  },
  guideText: {
    fontSize: 20,
  },
  plateInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 20,
    padding: isAndroid ? 10 : 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'yellowgreen',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: 200,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
});
