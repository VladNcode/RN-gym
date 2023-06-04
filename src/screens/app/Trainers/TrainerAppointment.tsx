import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import {
  Button,
  Datepicker,
  Divider,
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Spinner,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { DateTime, Settings } from 'luxon';
import { OutputSlot, getSlots } from 'slot-calculator';

import { TrainerAppointmentNavigationProp, TrainerAppointmentRoute } from '../../../constants';
import { userState } from '../../../store/user';
import { parseTime } from './helpers';
import { Booking } from './types';

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
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  footerControl: {
    marginHorizontal: 2,
  },
  name: {
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  image: { width: 200, height: 200, borderRadius: 100 },
  divider: {
    marginVertical: 16,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface TrainerAppointmentNavigationProps {
  route: TrainerAppointmentRoute;
  navigation: TrainerAppointmentNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainerAppointment = ({ navigation, route }: TrainerAppointmentNavigationProps) => {
  const user = useRecoilValue(userState);
  const themeStyles = useStyleSheet(themedStyles);

  const { trainer } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const now = new Date();

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectData, setSelectData] = useState<string[]>([]);
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const userRef = firestore().doc(`users/${user?.uid}`);

  useEffect(() => {
    const trainerRef = firestore().doc(`trainers/${trainer.id}`);

    const subscriber = firestore()
      .collection('trainerBookings')
      .where('trainerId', '==', trainerRef)
      .where('date', '==', date.toLocaleDateString())
      .onSnapshot(querySnapshot => {
        const items: Booking[] = [];

        querySnapshot.forEach(documentSnapshot => {
          items.push(documentSnapshot.data() as Booking);
        });

        setData(items);
      });

    const fetchData = async () => {
      try {
        setLoading(true);

        const classesDocs = (
          await firestore()
            .collection('trainerBookings')
            .where('trainerId', '==', trainerRef)
            .where('date', '==', date.toLocaleDateString())
            .get()
        ).docs;

        setData(classesDocs.map(doc => doc.data() as Booking));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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

    const doc: Booking = {
      trainerId: trainerRef,
      userId: userRef,
      date: date.toLocaleDateString(),
      slot: [f, t],
    };

    await firestore().collection('trainerBookings').add(doc);

    setData(d => [...d, doc]);
    setSelectedIndex(new IndexPath(0));
  };

  const filter = (d: Date): boolean => trainer.availabilityDays.find(day => day === d.getDay()) !== undefined;

  return (
    <SafeAreaView style={themeStyles.container}>
      <TopNavigation title="Book a training session" alignment="center" accessoryLeft={BackAction} />
      {loading ? (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      ) : (
        <Layout style={styles.layoutContainer} level="1">
          <View style={styles.alignCenter}>
            <Image source={require('../../../assets/icon.png')} style={styles.image} />

            <Text style={styles.name} category="h4">
              {trainer.name}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <Text category="h6">{`Selected date: ${date.toLocaleDateString()}`}</Text>

          <Datepicker
            min={now}
            max={new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())}
            filter={filter}
            date={date}
            onSelect={setDate}
          />

          {selectData.length ? (
            <Select value={displayValue} selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
              {selectData.map((slot: string) => {
                return <SelectItem key={slot} title={slot} />;
              })}
            </Select>
          ) : (
            <Text category="h6">No slots available for this day</Text>
          )}

          <Divider style={styles.divider} />

          <View style={styles.footerContainer}>
            <Button style={styles.footerControl} size="small" status="basic">
              CANCEL
            </Button>
            <Button onPress={bookTrainingSession} style={styles.footerControl} size="small">
              ACCEPT
            </Button>
          </View>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default TrainerAppointment;
