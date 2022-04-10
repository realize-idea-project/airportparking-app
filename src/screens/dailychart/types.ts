import { DailychartProtocol } from '../../apis/dailychart';

export interface Reservation {
  rowCount: number; // 1
  carType: string; // k7
  contactNumber: string; // 01027229561
  customerName: string;
  listDate: string; // 2022-02-07
  note: string; // ''
  plateNumber: string; // 43en3412
  serviceCharge: number; // 60000
  serviceEndAt: string; // 15:00
  serviceEndDate: string; // 22
  serviceTime: string; // 00:00
  serviceType: string;
  isServiceIn: boolean; // is 입고?
}

const SERVICE_IN = '입고';

export const generateReservation = (protocol: DailychartProtocol): Reservation => {
  const { id, serviceType, ...rest } = protocol;

  const isServiceIn = serviceType === SERVICE_IN;

  return {
    ...rest,
    rowCount: id,
    serviceType,
    isServiceIn,
  };
};
