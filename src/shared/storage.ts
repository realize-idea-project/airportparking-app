import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export const STORAGE_KEY = {
  login: 'login',
};

export const storeData = async <T>(key: string, value: T) => {
  if (_.isNil(value)) return;
  const item = typeof value !== 'string' ? JSON.stringify(value) : value;
  await AsyncStorage.setItem(key, item);
};

export const getData = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  console.log('value', value);
  if (_.isNil(value)) return null;
  return typeof value !== 'string' ? JSON.parse(value) : value;
};

export const deleteData = async (key: string) => {
  console.log('delete');
  await AsyncStorage.removeItem(key);
};
