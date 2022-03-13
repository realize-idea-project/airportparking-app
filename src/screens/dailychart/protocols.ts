export interface DailychartProtocol {
  id: number; // 1
  carType: string; // k7
  contactNumber: string; // 010-2722-9561
  customerName: string; // 김영철
  listDate: string; // 2022-02-27
  note: string; // ''
  plateNumber: string; // 43en3412
  serviceCharge: number; // 60000
  serviceEndAt: string; // 15:00
  serviceEndDate: string; // 22
  serviceTime: string; // 00:00
  serviceType: string; // 입고 || 출고
  createdAt: Date; // 2022-02-27T06:50:33.000Z
  updatedAt: Date;
}

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
