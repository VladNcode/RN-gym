import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import {
  Button,
  Card,
  Datepicker,
  Divider,
  Icon,
  IndexPath,
  Layout,
  Modal,
  NativeDateService,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { DateTime, Settings } from 'luxon';
import { OutputSlot, getSlots } from 'slot-calculator';

import { TrainerAppointmentNavigationProp, TrainerAppointmentRoute } from '../../../constants';
import useSocialShareButton from '../../../hooks/useSocialShareButton';
import { userState } from '../../../store/user';
import getCorrectTimeStartOfDay from '../../../utils/getCorrectTime';
import findClosestAvailableClassDate from '../Classes/utils';
import { parseTime } from './helpers';
import { TrainerBooking } from './types';

Settings.defaultZone = 'UTC';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerControl: {
    marginHorizontal: 6,
    width: '40%',
  },
  name: {
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  image: { width: 200, height: 200, borderRadius: 100 },
  divider: {
    marginVertical: 20,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
  timeSelector: { marginTop: 20 },
  selectedDateText: {
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    marginHorizontal: 8,
  },
  modalButtonsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface TrainerAppointmentNavigationProps {
  route: TrainerAppointmentRoute;
  navigation: TrainerAppointmentNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainerAppointment = ({ navigation, route }: TrainerAppointmentNavigationProps) => {
  const user = useRecoilValue(userState);
  const SocialShareButton = useSocialShareButton();

  const { trainer } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const now = new Date();
  const startDate = findClosestAvailableClassDate(trainer.availabilityDays);

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [date, setDate] = useState(startDate);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectData, setSelectData] = useState<string[]>([]);
  const [data, setData] = useState<TrainerBooking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [bookedTime, setBookedTime] = useState<string>('');

  const userRef = firestore().doc(`users/${user?.uid}`);

  useEffect(() => {
    const trainerRef = firestore().doc(`trainers/${trainer.id}`);

    const subscriber = firestore()
      .collection('trainerBookings')
      .where('trainerId', '==', trainerRef)
      .where('date', '==', getCorrectTimeStartOfDay(date))
      .onSnapshot(querySnapshot => {
        const items: TrainerBooking[] = [];

        querySnapshot.forEach(documentSnapshot => {
          items.push(documentSnapshot.data() as TrainerBooking);
        });

        setData(items);
      });

    return () => {
      subscriber();
    };
  }, [date, trainer.id]);

  useEffect(() => {
    const dateTimeRef = DateTime.utc(date.getFullYear(), date.getMonth() + 1, date.getDate());

    const from = dateTimeRef.set({ hour: trainer.availabilityHours[0] }).toISO() as string;
    const to = dateTimeRef.set({ hour: trainer.availabilityHours[1] }).toISO() as string;

    const unavailability = data.map(booking => ({
      from: dateTimeRef.set({ hour: booking.slot[0] }).toString(),
      to: dateTimeRef.set({ hour: booking.slot[1] }).toString(),
    }));

    const { availableSlotsByDay } = getSlots({
      from,
      to,
      unavailability,
      duration: 60,
    });

    if (Object.keys(availableSlotsByDay).length) {
      setSelectData(
        Object.values(availableSlotsByDay)[0].map(
          (slot: OutputSlot) => `${parseTime(slot.from)} - ${parseTime(slot.to)}`,
        ),
      );
    } else {
      setSelectData([]);
    }
  }, [data, date, trainer.availabilityHours]);

  const displayValue = selectData[Array.isArray(selectedIndex) ? selectedIndex[0].row : selectedIndex.row];

  const bookTrainingSession = async () => {
    const trainerRef = firestore().doc(`trainers/${trainer.id}`);
    const [f, t] = displayValue.split(' - ').map((time: string) => parseInt(time.slice(0, 2), 10));

    const doc: TrainerBooking = {
      trainerId: trainerRef,
      userId: userRef,
      date,
      slot: [f, t],
    };

    await firestore().collection('trainerBookings').add(doc);

    setBookedTime(displayValue);
    setData(d => [...d, doc]);
    setShowModal(true);
  };

  const filter = (d: Date): boolean => trainer.availabilityDays.find(day => day === d.getDay()) !== undefined;
  const formatDateService = new NativeDateService('en', { format: 'DD/MM/YYYY' });
  const formattedDate = formatDateService.format(date, 'DD/MM/YYYY');

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.container}>
        <TopNavigation title="Book a training session" alignment="center" accessoryLeft={BackAction} />

        <Layout style={styles.layoutContainer} level="1">
          <View style={styles.alignCenter}>
            <Image source={{ uri: trainer.imageUrl }} style={styles.image} />

            <Text style={styles.name} category="h4">
              {trainer.name}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <Modal
            style={styles.modal}
            visible={showModal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setShowModal(false)}>
            <Card disabled={true}>
              <Text style={styles.modalText} category="h6">
                Your session with {trainer.name} has been booked! 😻
              </Text>
              <Text style={styles.modalText} category="s1">
                Date: {formattedDate}
              </Text>
              <Text style={styles.modalText} category="s1">
                Time: {bookedTime}
              </Text>

              <View style={styles.modalButtonsContainer}>
                <Button
                  size="small"
                  status="success"
                  style={styles.modalButton}
                  onPress={() => {
                    setSelectedIndex(new IndexPath(0));
                    setShowModal(false);
                  }}>
                  DISMISS
                </Button>

                <SocialShareButton
                  styles={styles.modalButton}
                  options={{
                    message: `I have just signed up for a training session with ${trainer.name}!`,
                  }}
                />
              </View>
            </Card>
          </Modal>

          <Text style={styles.selectedDateText} category="h6">{`Selected date: ${formattedDate}`}</Text>

          <Datepicker
            // dateService={formatDateService}
            style={styles.timeSelector}
            min={now}
            max={new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())}
            filter={filter}
            date={date}
            onSelect={d => {
              setDate(getCorrectTimeStartOfDay(d));
            }}
          />

          <View style={styles.timeSelector}>
            {selectData.length ? (
              <Select value={displayValue} selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
                {selectData.map((slot: string) => {
                  return <SelectItem key={slot} title={slot} />;
                })}
              </Select>
            ) : (
              <Text category="h6">No slots available for this day</Text>
            )}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.footerContainer}>
            <Button style={styles.footerControl} size="small" status="basic" onPress={navigateBack}>
              CANCEL
            </Button>
            <Button
              disabled={!displayValue || !date}
              onPress={bookTrainingSession}
              style={styles.footerControl}
              size="small">
              BOOK
            </Button>
          </View>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default TrainerAppointment;
