import React, { FC } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert } from 'react-native';
import _ from 'lodash';
import { Reservation } from '../types';

interface Props {
  list: Reservation[];
}

export const DailyChartList: FC<Props> = ({ list }) => {
  if (_.isEmpty(list)) return null;

  return (
    <>
      <ScrollView horizontal>
        <FlatList
          data={list}
          keyExtractor={(item) => item.rowCount.toString()}
          renderItem={({ item, index }) => <DailyChartItem item={item} index={index} />}
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
      <Text style={[itemStyles.row, itemStyles.note]}>비고</Text>
      <Text style={[itemStyles.row, itemStyles.endDate]}>출고일</Text>
    </View>
  );
};

interface DailyChartItemProps {
  item: Reservation;
  index: number;
}
const EXTERNAL_CHANNEL = '티몬';

const DailyChartItem: FC<DailyChartItemProps> = ({ item, index }) => {
  const serviceCharge = item.serviceCharge === 0 ? EXTERNAL_CHANNEL : withThousandSparator(item.serviceCharge);

  return (
    <View style={itemStyles.itemContainer}>
      <Text style={[itemStyles.row, itemStyles.rowId]}>{index + 1}</Text>
      <Text style={[itemStyles.row, itemStyles.serviceType]}>{item.serviceType}</Text>
      <Text style={[itemStyles.row, itemStyles.serviceTime]}>{item.serviceTime}</Text>
      <Text style={[itemStyles.row, itemStyles.carType]}>{item.carType}</Text>
      <Text style={[itemStyles.row, itemStyles.plateNumber]}>{item.plateNumber}</Text>
      <Text style={[itemStyles.row, itemStyles.contact]}>{item.contactNumber}</Text>
      <Text style={[itemStyles.row, itemStyles.charge]}>{serviceCharge}</Text>
      <Text style={[itemStyles.row, itemStyles.note]}>{item.note}</Text>
      <Text style={[itemStyles.row, itemStyles.endDate]}>{item.serviceEndDate}</Text>
    </View>
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
    paddingVertical: 10,
    fontSize: 18,
    borderWidth: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  rowId: {
    paddingHorizontal: 10,
    width: 60,
    textAlign: 'center',
  },
  serviceType: {
    paddingHorizontal: 10,
    width: 80,
    textAlign: 'center',
  },
  serviceTime: {
    paddingHorizontal: 10,
    width: 80,
    textAlign: 'center',
  },
  carType: {
    width: 200,
  },
  plateNumber: {
    width: 150,
  },
  contact: {
    width: 180,
  },
  charge: {
    width: 150,
  },
  note: {
    width: 80,
  },
  endDate: {
    width: 120,
    textAlign: 'center',
  },
  headerColor: {
    backgroundColor: '#dddddd',
  },
});
