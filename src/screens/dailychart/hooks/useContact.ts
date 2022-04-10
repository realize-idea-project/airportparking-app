import { Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { Permission, PERMISSIONS } from 'react-native-permissions';

import { usePermission } from '../../../shared/hooks/usePermission';

import _ from 'lodash';

interface Contact {
  givenName: string;
  phoneNumbers: PhoneNumber[];
  note: string;
}

interface PhoneNumber {
  label: string;
  number: string;
}

const permissionsForContact: Permission[] =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.CONTACTS]
    : [PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.WRITE_CONTACTS];

export const useContact = () => {
  const { requestPermissions } = usePermission();

  const saveContactNumbers = async (contactlist: Contact[]) => {
    const isPermissionAccepted = await requestPermissions(permissionsForContact);

    try {
      if (isPermissionAccepted) {
        await saveBulkContact(contactlist);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error('error in saveContactNumbers', e);
      return false;
    }
  };

  const saveBulkContact = async (contact: Contact[]) => {
    for (let i = 0; i < contact.length; i++) {
      await saveContact(contact[i]);
      console.log('finished :', i, contact.length);
    }
  };

  const saveContact = async (contact: Contact) => {
    try {
      await Contacts.addContact(contact);
    } catch (e) {
      console.log(`An error occured while save contact: ${contact.givenName}`, e);
    }
  };

  const deleteContactNumbers = async (selectedDate: string) => {
    try {
      const list = await getAllContacts();
      const filteredList = list.filter((item) => item.note === selectedDate);

      for (let i = 0; i < filteredList.length; i++) {
        await deleteContact(filteredList[i]);
        console.log('finished :', i, filteredList.length);
      }
    } catch (e) {
      console.log(`An error occured while delete contact: `, e);
      return;
    }
  };

  const getAllContacts = async () => {
    const allContacts = await Contacts.getAll();
    return allContacts;
  };

  const deleteContact = async (contact: Contact) => {
    try {
      await Contacts.deleteContact(contact);
    } catch (e) {
      console.log(`An error occured while delete contact: ${contact.givenName}`, e);
    }
  };

  return {
    saveContactNumbers,
    deleteContactNumbers,
  };
};
