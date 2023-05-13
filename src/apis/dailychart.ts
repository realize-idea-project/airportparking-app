import Config from 'react-native-config';

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

export const loadDailyChartList = async (date: string): Promise<DailychartProtocol[]> => {
  const url = `${Config.API_URL}/reservation?date=${date}`;
  try {
    const res = await fetch(url, { method: 'GET' }); // android는 localhost 사용을 위한 설정 필요
    const { isSuccess, data } = await res.json();

    if (!isSuccess) throw new Error();

    return data ?? [];
  } catch (e) {
    console.error('An error occured in loadDailyChartList', e);
    throw e;
  }
};

export const updateDailyChart = async (id: number, serviceTime: string) => {
  const url = `${Config.API_URL}/dailychart`;
  const body = JSON.stringify({ id, serviceTime });

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    }); // android는 localhost 사용을 위한 설정 필요

    const isSuccess = await res.json();
    return isSuccess.isSuccess;
  } catch (e) {
    console.error('An error occured in updateDailyChart', e);
    throw e;
  }
};
