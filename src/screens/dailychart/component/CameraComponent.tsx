import React, { useState, useEffect } from 'react';
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
  Platform,
} from 'react-native';
import _ from 'lodash';

import { Permission, PERMISSIONS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { usePermission, useAcessContact, useSMS } from '../hooks';

const openCamera = async () => {
  const image = await ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: false,
  });

  return image;
};

const camera = Platform.OS === 'ios' ? [PERMISSIONS.IOS.CAMERA] : [PERMISSIONS.ANDROID.CAMERA];

export const CameraComponent = () => {
  const { requestPermissions } = usePermission();
  const { openSmsApp, openSmsAppWithPic } = useSMS();

  useEffect(() => {
    requestPermissions(camera);
  }, []);

  const sendSmsWithPicCrop = async () => {
    const permission = await requestPermissions(camera);

    if (permission) {
      const image = await openCamera();
      console.log('image', image);
      openSmsAppWithPic(['1097192118'], image);
    }
  };

  const sendSmsWithPic = async () => {
    const photo = await launchCamera({
      mediaType: 'photo',
    });
    console.log('reacthan-photo', photo);
    // openSmsAppWithPic(['1'], photo);
  };

  return (
    <Pressable onPress={sendSmsWithPic} style={{ height: 130, backgroundColor: 'green' }}>
      <Text>test</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
