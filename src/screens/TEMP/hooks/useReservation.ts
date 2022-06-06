import _ from 'lodash';
import { Reservation } from '../types';

interface Props {
  reservationList: Reservation[];
  selectedDate: string;
}

export const useReservation = ({ reservationList, selectedDate }: Props) => {
  const getContactNumberByServiceType = (isServiceIn: boolean) => {
    return reservationList
      .filter((reservation) => reservation.isServiceIn === isServiceIn)
      .map((serviceInUser) => serviceInUser.contactNumber);
  };

  const getSelectedUserDetail = (plateNumberHint: string) => {
    const selectedUser = reservationList.filter((user) => _.includes(user.plateNumber, plateNumberHint));

    if (_.isEmpty(selectedUser)) return;

    const { contactNumber, plateNumber } = selectedUser[0];
    return { contactNumber, plateNumber };
  };

  const generateContactFormat = () => {
    return reservationList.map((item) => {
      return {
        givenName: `${item.carType} ${item.plateNumber}`,
        phoneNumbers: [
          {
            label: 'mobile',
            number: `${item.contactNumber}`,
          },
        ],
        note: selectedDate,
      };
    });
  };

  return {
    reservationList,
    getContactNumberByServiceType,
    getSelectedUserDetail,
    generateContactFormat,
  };
};
