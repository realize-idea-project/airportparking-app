import React, { useState } from 'react';
import { Platform } from 'react-native';
import { checkMultiple, Permission, requestMultiple, PERMISSIONS } from 'react-native-permissions';
import _ from 'lodash';

export type PermissionGrantType = 'checking' | 'granted' | 'denied';

export const useContactPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionGrantType>('checking');

  const checkAndRequestPermissions = async (permissions: Permission[]) => {
    const statuses = await checkMultiple(permissions);

    const deniedPermissions = permissions.filter((permission) => statuses[permission] === 'denied');
    if (deniedPermissions.length === 0) {
      return statuses;
    }

    await requestMultiple(deniedPermissions);
    return checkMultiple(permissions);
  };

  const requestPermissions = async (permissions: Permission[]) => {
    const statuses = await checkAndRequestPermissions(permissions);

    const allGranted = _.every(statuses, (v) => v === 'granted');
    setPermissionStatus(allGranted ? 'granted' : 'denied');

    return allGranted;
  };

  return { permissionStatus, requestPermissions };
};
