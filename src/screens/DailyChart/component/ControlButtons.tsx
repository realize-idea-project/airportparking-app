import React, { FC } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import _ from 'lodash';

interface Props {
  onClickSendServiceInMessage: () => void;
  onClickSendServiceOutMessage: () => void;
  onClickSaveContact: () => void;
  onClickSendMMS: () => void;
  onClickAdvertiseSMS: () => void;
  
}

export const ControlButtons: FC<Props> = ({
  onClickSendServiceInMessage,
  onClickSendServiceOutMessage,
  onClickSaveContact,
  onClickSendMMS,
  onClickAdvertiseSMS,

}) => {
  return (
    <>
      <View style={styles.buttonContainer}>
        <View style={styles.space} />
        <Pressable style={styles.button} onPress={onClickSendServiceInMessage}>
          <Text>입고 메세지</Text>
        </Pressable>
        <View style={styles.space} />
        <Pressable style={styles.button} onPress={onClickSaveContact}>
          <Text>저장 하기</Text>
        </Pressable>
        <View style={styles.space} />
        <Pressable style={[styles.button, styles.sendToServiceOut]} onPress={onClickSendServiceOutMessage}>
          <Text>출고 메세지</Text>
        </Pressable>
        <View style={styles.space} />
        
      </View>
      <View style={{ height: 15 }} />
      <View>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.sendAdButton, { marginLeft: 8 }]} onPress={onClickAdvertiseSMS}>
            <Text style={styles.adText}>광고 전송</Text>
          </Pressable>
          <View style={styles.space} />
          <Pressable style={[styles.button, styles.sendPicButton, { marginLeft: 8 }]} onPress={onClickSendMMS}>
            <Text style={styles.sendPicButtonText}>사진 전송</Text>
          </Pressable>

          <View style={styles.space} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    backgroundColor: '#dddddd',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    
  },
  space: {
    width: 10,
  },
  listContentContainerStyle: {
    paddingBottom: 50,
  },
  sendPicButton: {
    backgroundColor: 'tomato',
  },
  sendAdButton: {
    backgroundColor: '#dddddd',
  },
  adText: {
    color: 'black',
  },
  sendPicButtonText: {
    fontWeight: '500',
    color: 'white',
  },
  sendToServiceOut: {
    backgroundColor: 'yellowgreen',
  },
});
