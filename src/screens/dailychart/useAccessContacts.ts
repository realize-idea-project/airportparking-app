import React from 'react';
import Contacts, { Contact } from 'react-native-contacts';
import { DailychartProtocol } from './protocols';

interface GeneratedContact {
  givenName: string;
  phoneNumbers: PhoneNumber[];
}

interface PhoneNumber {
  label: string;
  number: string;
}

export const useAcessContact = () => {
  
  const getAllContacts = async () => {
    const allContacts = await Contacts.getAll();
    return allContacts;
  };

  const saveBulkContact = async (contact: GeneratedContact[]) => {
    for (let i = 0; i < contact.length; i++) {
      await saveContact(contact[i]);
      console.log('finished :', i, contact.length)
    }
  };

  const saveContact = async (contact: GeneratedContact) => {
    try {
      await Contacts.addContact(contact);
    } catch (e) {
      console.log(`An error occured while save contact: ${contact.givenName}`, e);
    }
  };

  const deleteAllContacts = async (selectedDate: string) => {
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

  const deleteContact = async (contact: GeneratedContact) => {
    try {
      await Contacts.deleteContact(contact);
    } catch (e) {
      console.log(`An error occured while delete contact: ${contact.givenName}`, e);
    }
  };

  const generateContacts = (reservationList: DailychartProtocol[], selectedDate: string): GeneratedContact[] => {
    return reservationList.map((item) => {
      return {
        givenName: `${item.carType} ${item.plateNumber}`,
        phoneNumbers: [{
          label: 'mobile',
          number: `${item.contactNumber}`,
        }],
        note: selectedDate,
      }
    });
  };

  return { 
    getAllContacts,
    saveContact,
    deleteContact,
    generateContacts,
    saveBulkContact,
    deleteAllContacts,
  };
};



// {
//   recordID: '6b2237ee0df85980',
//   backTitle: '',
//   company: '',
//   emailAddresses: [{
//     label: 'work',
//     email: 'carl-jung@example.com',
//   }],
//   familyName: 'Jung',
//   givenName: 'Carl',
//   middleName: '',
//   jobTitle: '',
//   phoneNumbers: [{
//     label: 'mobile',
//     number: '(555) 555-5555',
//   }],
//   hasThumbnail: true,
//   thumbnailPath: 'content://com.android.contacts/display_photo/3',
//   postalAddresses: [{
//     label: 'home',
//     formattedAddress: '',
//     street: '123 Fake Street',
//     pobox: '',
//     neighborhood: '',
//     city: 'Sample City',
//     region: 'CA',
//     state: 'CA',
//     postCode: '90210',
//     country: 'USA',
//   }],
//   prefix: 'MR',
//   suffix: '',
//   department: '',
//   birthday: {'year': 1988, 'month': 1, 'day': 1 },
//   imAddresses: [
//     { username: '0123456789', service: 'ICQ'},
//     { username: 'johndoe123', service: 'Facebook'}
//   ]
// }