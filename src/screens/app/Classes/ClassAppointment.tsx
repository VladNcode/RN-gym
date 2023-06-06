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
  Layout,
  Modal,
  NativeDateService,
  Spinner,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { Settings } from 'luxon';

import { ClassAppointmentNavigationProp, ClassAppointmentRoute } from '../../../constants';
import { userState } from '../../../store/user';
import { ClassBooking } from '../Trainers/types';
import findClosestAvailableClassDate from './utils';

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
  image: { width: 150, height: 150, borderRadius: 100 },
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
  },
  modalButton: {
    marginTop: 16,
  },
  alreadyEnrolled: {
    marginTop: 16,
    textAlign: 'center',
  },
});

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface ClassAppointmentNavigationProps {
  route: ClassAppointmentRoute;
  navigation: ClassAppointmentNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const ClassAppointment = ({ navigation, route }: ClassAppointmentNavigationProps) => {
  const user = useRecoilValue(userState);
  const themeStyles = useStyleSheet(themedStyles);

  const { classInfo } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const now = new Date();

  const startDate = findClosestAvailableClassDate(classInfo.availabilityDays);

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [date, setDate] = useState(startDate);
  const [data, setData] = useState<ClassBooking>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatDateService = new NativeDateService('en', { format: 'DD/MM/YYYY' });
  const formattedDate = formatDateService.format(date, 'DD/MM/YYYY');

  const userRef = firestore().doc(`users/${user?.uid}`);

  useEffect(() => {
    const classRef = firestore().doc(`classes/${classInfo.id}`);

    const subscriber = firestore()
      .collection('classBookings')
      .where('classId', '==', classRef)
      .where('date', '==', formattedDate)
      .limit(1)
      .onSnapshot(querySnapshot => {
        const items: ClassBooking[] = [];

        querySnapshot.forEach(documentSnapshot => {
          items.push(documentSnapshot?.data() as ClassBooking);
        });

        setData({ ...items[0], id: items[0]?.id });
      });

    const fetchData = async () => {
      try {
        setLoading(true);

        const classesDocs = (
          await firestore()
            .collection('classBookings')
            .where('classId', '==', classRef)
            .where('date', '==', formattedDate)
            .limit(1)
            .get()
        ).docs;

        setData({ ...classesDocs[0]?.data(), id: classesDocs[0]?.id } as ClassBooking);
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
  }, [classInfo.id, classInfo.trainer, date, formattedDate]);

  const bookTrainingSession = async () => {
    const trainerRef = firestore().doc(`trainers/${classInfo.trainer}`);
    const classRef = firestore().doc(`classes/${classInfo.id}`);

    try {
      const docRef = firestore().collection('classBookings').doc(data?.id);

      await docRef.get().then(d => {
        console.log('d.exists :>> ', d.exists);
        if (d.exists) {
          // Update existing document
          docRef.update({
            participants: firestore.FieldValue.arrayUnion(userRef),
          });
        } else {
          // Create new document
          docRef.set({
            classId: classRef,
            date: formattedDate,
            limit: classInfo.limit,
            participants: [userRef],
            trainerId: trainerRef,
          });
        }
      });

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const alreadyBooken = data?.participants?.find(p => p.id === userRef.id);
  const usersEnrolledCount = data?.participants?.length || 0;

  const filter = (d: Date): boolean => classInfo.availabilityDays.find(day => day === d.getDay()) !== undefined;

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
              {classInfo.name}
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
                😻 Your signed up for a {classInfo.name} class!
              </Text>
              <Text style={styles.modalText} category="s1">
                Time: {classInfo.dateAndTime}
              </Text>
              <Button status="success" style={styles.modalButton} onPress={() => setShowModal(false)}>
                DISMISS
              </Button>
            </Card>
          </Modal>

          <Text style={styles.selectedDateText} category="h6">{`Selected date: ${formattedDate}`}</Text>
          <Text
            style={styles.selectedDateText}
            category="h6">{`${usersEnrolledCount}/${classInfo.limit} participants`}</Text>

          <Datepicker
            dateService={formatDateService}
            style={styles.timeSelector}
            min={now}
            max={new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())}
            filter={filter}
            date={date}
            onSelect={setDate}
          />

          {alreadyBooken && (
            <Text style={styles.alreadyEnrolled} category="label">
              You have already enrolled for this day
            </Text>
          )}

          {data && classInfo.limit === usersEnrolledCount && !alreadyBooken && (
            <Text category="h6">No slots available for this day</Text>
          )}

          <Divider style={styles.divider} />

          <View style={styles.footerContainer}>
            <Button style={styles.footerControl} size="small" status="basic" onPress={navigateBack}>
              CANCEL
            </Button>
            <Button
              disabled={!date || classInfo.limit === usersEnrolledCount || !!alreadyBooken}
              onPress={bookTrainingSession}
              style={styles.footerControl}
              size="small">
              BOOK
            </Button>
          </View>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default ClassAppointment;
