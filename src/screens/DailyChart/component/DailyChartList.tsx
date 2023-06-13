import React, { FC } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Pressable } from 'react-native';
import _ from 'lodash';

import { CustomNavigationType } from '../../../navigations';
import { Reservation } from '../types';

interface Props {
  navigation: CustomNavigationType<'DailyChart', 'navigation'>;
  list: Reservation[];
}

export const DailyChartList: FC<Props> = ({ list, navigation }) => {
  if (_.isEmpty(list)) return null;

  const showAlert = (item: Reservation, rowNo: number) => {
    Alert.alert(`${rowNo}번 예약을 수정하시겠습니까?`, '', [
      { text: '수정하기', onPress: () => goToEdit(item, rowNo) },
      { text: '취소하기' },
    ]);
  };

  const goToEdit = (item: Reservation, rowNo: number) => {
    navigation.push('UpdateChart', { reservation: item, rowNo });
  };

  return (
    <>
      <ScrollView horizontal>
        <FlatList
          data={list}
          keyExtractor={(item) => item.rowCount.toString()}
          renderItem={({ item, index }) => <DailyChartItem item={item} rowNo={index + 1} onLongPress={showAlert} />}
          contentContainerStyle={styles.listContentContainerStyle}
          ListHeaderComponent={<DailyChartListHeader total={list.length} />}
        />
      </ScrollView>
      <View style={{ height: 10 }} />
    </>
  );
};

const styles = StyleSheet.create({
  listContentContainerStyle: {
    paddingBottom: 50,
  },
});

interface HeaderProps {
  total: number;
}

const DailyChartListHeader: FC<HeaderProps> = ({ total }) => {
  return (
    <View style={[itemStyles.itemContainer, itemStyles.headerColor]}>
      <Text style={[itemStyles.row, itemStyles.rowId]}>{total}</Text>
      <Text style={[itemStyles.row, itemStyles.serviceType]}>입/출고</Text>
      <Text style={[itemStyles.row, itemStyles.serviceTime]}>시간</Text>
      <Text style={[itemStyles.row, itemStyles.carType]}>차종</Text>
      <Text style={[itemStyles.row, itemStyles.plateNumber]}>차량 번호</Text>
      <Text style={[itemStyles.row, itemStyles.contact]}>연락처</Text>
      <Text style={[itemStyles.row, itemStyles.charge]}>금액</Text>
      {/* <Text style={[itemStyles.row, itemStyles.note]}>비고</Text> */}
      <Text style={[itemStyles.row, itemStyles.endDate]}>출고일</Text>
    </View>
  );
};

interface DailyChartItemProps {
  item: Reservation;
  rowNo: number;
  onLongPress: (item: Reservation, rowNo: number) => void;
}
const EXTERNAL_CHANNEL = '티몬';

const DailyChartItem: FC<DailyChartItemProps> = ({ item, rowNo, onLongPress }) => {
  const serviceCharge = item.serviceCharge === 0 ? EXTERNAL_CHANNEL : withThousandSparator(item.serviceCharge);

  const handleLongPress = () => {
    onLongPress(item, rowNo);
  };

  return (
    <Pressable style={itemStyles.itemContainer} onLongPress={handleLongPress}>
      <Text style={[itemStyles.row, itemStyles.rowId]}>{rowNo}</Text>
      <Text style={[itemStyles.row, itemStyles.serviceType]}>{item.serviceType}</Text>
      <Text style={[itemStyles.row, itemStyles.serviceTime]}>{item.serviceTime}</Text>
      <Text style={[itemStyles.row, itemStyles.carType]}>{item.carType}</Text>
      <Text style={[itemStyles.row, itemStyles.plateNumber]}>{item.plateNumber}</Text>
      <Text style={[itemStyles.row, itemStyles.contact]}>{item.contactNumber}</Text>
      <Text style={[itemStyles.row, itemStyles.charge]}>{serviceCharge}</Text>
      {/* <Text style={[itemStyles.row, itemStyles.note]}>{item.note}</Text> */}
      <Text style={[itemStyles.row, itemStyles.endDate]}>{item.serviceEndDate}</Text>
    </Pressable>
  );
};

const withThousandSparator = (amount: number) => {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return amount.toString().replace(regexp, ',');
};

const itemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 21,
    borderWidth: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    fontWeight: '600',
    color: 'black',
  },
  rowId: {
    paddingHorizontal: 10,
    width: 60,
    textAlign: 'center',
  },
  serviceType: {
    paddingHorizontal: 10,
    width: 100,
    textAlign: 'center',
  },
  serviceTime: {
    paddingHorizontal: 10,
    width: 80,
    textAlign: 'center',
  },
  carType: {
    width: 180,
  },
  plateNumber: {
    width: 160,
  },
  contact: {
    width: 200,
  },
  charge: {
    width: 130,
  },
  note: {
    width: 80,
  },
  endDate: {
    width: 100,
    textAlign: 'center',
  },
  headerColor: {
    backgroundColor: '#dddddd',
  },
});
