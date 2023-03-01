import React, { FC, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Pressable, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import _ from 'lodash';

import { updateDailyChart } from '../../apis/dailychart';
import { CustomNavigationType } from '../../navigations';
import { HeaderWithGoback } from '../../components/Header';
import { Reservation } from '../../shared/types/Reservation';

import { formatTimeToHHMM } from './helper';


interface Props {
  navigation: CustomNavigationType<'UpdateChart', 'navigation'>;
  route: CustomNavigationType<'UpdateChart', 'route'>;
}

export const UpdateChart: FC<Props> = ({ navigation, route }) => {
  const goPreviousScreen = () => navigation.pop();
  const { reservation, rowNo } = route.params;

  const [editableReservation, setEditableReservation] = useState(reservation);
  const [selectedSection, setSelectedSection] = useState<keyof Reservation>();
  const [isGuideOpened, setIsGuideOpened] = useState(false);

  const lock = useRef(false);

  const selectSection = (key: keyof Reservation) => {
    setSelectedSection(selectedSection === key ? undefined : key);
  };

  const toggleGuideSection = () => {
    setIsGuideOpened((prev) => !prev);
  };

  const selectTime = (selectedTime: Date) => {
    setSelectedSection(undefined);
    const changedTime = formatTimeToHHMM(selectedTime);
    
    setEditableReservation((prev) => ({
      ...prev,
      serviceTime: changedTime
    }));
  };

  const cancelSelectTime = () => {
    setSelectedSection(undefined);
  };

  const updateReservation = async () => {
    if (!lock.current) {
      lock.current = true;
      const isSuccess = await updateDailyChart(editableReservation.rowCount, editableReservation.serviceTime);
      
      if (isSuccess) {
        Alert.alert('변경에 성공하였습니다. 처음부터 다시 진행해주세요.', '', [
          {
            text: '확인', onPress: () => {
              navigation.navigate('DatePicker');
              lock.current = false;
            }
          }
        ]);
      } else {
        Alert.alert('시간 변경에 실패하였습니다. 다시 시도해주세요.', '', [
          {
            text: '확인', onPress: () => {
              lock.current = false;
            }
          }
        ]);
      }
    }
  };




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <HeaderWithGoback text="주차 예약 수정" onClickLeftComponent={goPreviousScreen} leftComponent />

        <GuideText isGuideOpened={isGuideOpened} onToggle={toggleGuideSection} />
    
        <UpdateCard 
          item={reservation} 
          rowNo={rowNo} 
          editedItem={editableReservation}
          selectedSection={selectedSection}
          onPress={selectSection}
        />

        <Pressable 
          onPress={updateReservation}
          style={styles.changeButton}
          disabled={_.isEqual(reservation, editableReservation)}
        >
          <Text style={styles.changeButtonText}>변경하기</Text>
        </Pressable>

        {
          selectedSection === 'serviceTime' && (
            <DateTimePickerModal 
              isVisible={true}
              mode={'time'}
              onConfirm={selectTime}
              onCancel={cancelSelectTime}
              // date={date} 
            />
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
};

const GuideText = ({ isGuideOpened, onToggle }: { isGuideOpened: boolean, onToggle: () => void }) => {
  return (
    <View style={styles.guideContainer}>
      <Pressable style={styles.guideHeader} onPress={onToggle}>
        <Text style={styles.guideTitle}>사용방법</Text>
        <Text style={isGuideOpened? styles.close : styles.open}>
          {isGuideOpened ? '닫기' : '보기'}
        </Text>
      </Pressable>
      <View style={{height: 10}} />
      {isGuideOpened && (
        <>
          <Text style={styles.guideText}>1.입 / 출고 시간을 눌러주세요.</Text>
           <Text style={styles.guideText}>2.시간을 선택해주세요.</Text>
           <Text style={styles.guideText}>3.'변경 후'칸에서 변경내용을 확인하세요.</Text>
           <Text style={styles.guideText}>4.변경하기 버튼을 눌러주세요.</Text>
        </>
      )}
    </View>
  )
}

interface UpdateCardProps {
  item: Reservation;
  editedItem: Reservation;
  rowNo: number;
  selectedSection: keyof Reservation | undefined;
  onPress: (section: keyof Reservation) => void;
}

const UpdateCard: FC<UpdateCardProps> = ({ item, rowNo, editedItem, onPress, selectedSection }) => {
  

  return (
    <View style={{ borderBottomWidth: 1 }}>
      <View style={[styles.itemContainer, { borderWidth: 1 }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>항목</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>변경 전</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>변경 후</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>목록 번호</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rowNo}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>-</Text>
        </View>
      </View>

      <View 
        // onPress={() => onPress('carType')}
        style={[
          styles.itemContainer,
          selectedSection === 'carType' && styles.selected
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>차종</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.carType}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>-</Text>
        </View>
      </View>

      <Pressable 
        onPress={() => onPress('serviceTime')}
        style={[
          styles.itemContainer,
          selectedSection === 'serviceTime' && styles.selected
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>입/출고 시간</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.serviceTime}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text 
            style={[
              styles.title,
              !_.isEqual(item.serviceTime, editedItem.serviceTime) && styles.changedHighlight
            ]}
          >
            {_.isEqual(item.serviceTime, editedItem.serviceTime) ? '-' : editedItem.serviceTime }
          </Text>
        </View>
      </Pressable>

      <View 
      // onPress={() => onPress('carType')}
        style={[
          styles.itemContainer,
          selectedSection === 'serviceEndDate' && styles.selected
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>출고 날짜</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.serviceEndDate}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>-</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
  },
  title: {
    fontSize: 24,
  },
  selected: {
    borderWidth: 3,
    borderColor: 'yellowgreen',
  },
  guideContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  guideTitle: {
    fontSize:30
  },
  guideText: {
    fontSize: 20
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  open: {
    fontSize: 22,
    fontWeight: '700',
    color: 'yellowgreen',
  },
  close: {
    fontSize: 18,
    color: 'black',
  },
  changedHighlight: {
    fontWeight: '700',
    color: 'red',
  },
  changeButton: {
    marginTop: 50,
    marginHorizontal: 20,
    height: 70,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  changeButtonText: {
    fontSize: 30,
    fontWeight: '500'
  }
});