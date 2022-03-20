import React, { useState } from 'react';
import { Platform } from 'react-native';
import { checkMultiple, Permission, requestMultiple, PERMISSIONS } from 'react-native-permissions';
import _ from 'lodash';

const permissionOfContacts: Permission[] =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.CONTACTS]
    : [PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.WRITE_CONTACTS];

export type PermissionGrantType = 'checking' | 'granted' | 'denied';

export const useContactPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionGrantType>('checking');

  const checkAndRequestPermissions = async () => {
    const statuses = await checkMultiple(permissionOfContacts);

    const deniedPermissions = permissionOfContacts.filter((permission) => statuses[permission] === 'denied');
    if (deniedPermissions.length === 0) {
      return statuses;
    }

    await requestMultiple(deniedPermissions);
    return checkMultiple(permissionOfContacts);
  };

  const requestPermissions = () => {
    checkAndRequestPermissions().then((statuses) => {
      const allGranted = _.every(statuses, (v) => v === 'granted');
      setPermissionStatus(allGranted ? 'granted' : 'denied');
    });
  };

  return { permissionStatus, requestPermissions };
};
