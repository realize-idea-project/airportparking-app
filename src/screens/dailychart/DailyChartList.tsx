import React, { FC } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, Alert } from 'react-native';
import _ from 'lodash';
import { DailychartProtocol } from './protocols';

interface Props {
  selectedDate: string;
  list: DailychartProtocol[];
  onClickReset: () => void;
  onClickSave: () => void;
  onClickSendAll: () => void;
  onClickSendWithPic: () => void;
}

export const DailyChartList: FC<Props> = ({ list, onClickReset, onClickSave, onClickSendAll, onClickSendWithPic }) => {
  if (_.isEmpty(list)) {
    Alert.alert('해당 날짜의 리스트가 없습니다.');
    onClickReset();
    return null;
  }

  return (
    <>
      <View style={{ height: 10 }} />
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.space} />
          <Pressable style={styles.button} onPress={onClickSendAll}>
            <Text>입고 메세지 보내기</Text>
          </Pressable>
          <View style={styles.space} />
          <Pressable style={styles.button} onPress={onClickSave}>
            <Text>저장 하기</Text>
          </Pressable>
          <View style={styles.space} />
          <Pressable style={[styles.button, styles.sendPicButton]} onPress={onClickSendWithPic}>
            <Text style={styles.sendPicButtonText}>사진 전송</Text>
          </Pressable>
          <View style={styles.space} />
        </View>
        <View style={{ height: 10 }} />
      </View>

      <ScrollView style={{ height: '100%' }}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <DailyChartItem item={item} index={index} />}
          contentContainerStyle={styles.listContentContainerStyle}
          ListHeaderComponent={<DailyChartListHeader total={list.length} />}
          horizontal
        />
      </ScrollView>
      <View style={{ height: 10 }} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: '#dddddd',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    width: 10,
  },
  listContentContainerStyle: {
    flexDirection: 'column',
    paddingBottom: 300,
  },
  sendPicButton: {
    backgroundColor: 'tomato',
  },
  sendPicButtonText: {
    fontWeight: '500',
    color: 'white',
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
  item: DailychartProtocol;
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
