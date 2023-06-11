import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageProps, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

import {
  Button,
  Card,
  Icon,
  IconElement,
  Layout,
  MenuItem,
  OverflowMenu,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { DateTime } from 'luxon';

import { RootTabParamsList } from '../../../constants';
import useSnapshot from '../../../hooks/useSnapshot';
import { userState } from '../../../store/user';
import { FirebaseClassBooking, FirebaseTrainerBooking } from '../Trainers/types';
import styles from './styles';

const getFormattedDateFromSeconds = (seconds: number) =>
  DateTime.fromSeconds(seconds, { zone: 'Europe/Kyiv' }).toFormat('dd/MM/yyyy');

const MenuIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="menu-outline" />;
const PlusIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="plus-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

interface TrainerBooking {
  date: string;
  time: [number, number];
  trainer: string;
}

interface ClassBooking {
  date: string;
  class: string;
  location: string;
}

const MoreIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props: Partial<ImageProps> | undefined): IconElement => (
  <Icon fill="#FF6721" {...props} name="info" />
);
const LogoutIcon = (props: Partial<ImageProps> | undefined): IconElement => (
  <Icon fill="#FF6721" {...props} name="log-out" />
);

const Home = (): React.ReactElement => {
  const user = useRecoilValue(userState);
  const navigation = useNavigation<DrawerNavigationProp<RootTabParamsList>>();
  const userRef = firestore().doc(`users/${user?.uid}`);

  const trainerBookingsQuery = firestore()
    .collection('trainerBookings')
    .where('userId', '==', userRef)
    .where('date', '>=', new Date())
    .orderBy('date', 'asc')
    .limit(1);

  const classBookingsQuery = firestore()
    .collection('classBookings')
    .where('participants', 'array-contains', userRef)
    .where('date', '>=', new Date())
    .orderBy('date', 'asc')
    .limit(1);

  const { loading: loadingTrainerBookings, data: trainerBookings } =
    useSnapshot<FirebaseTrainerBooking>(trainerBookingsQuery);
  const { loading: loadingClassBookings, data: classBookings } = useSnapshot<FirebaseClassBooking>(classBookingsQuery);

  const [trainerBooking, setTrainerBooking] = useState<TrainerBooking>();
  const [classBooking, setClassBooking] = useState<ClassBooking>();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const booking = trainerBookings[0];
    if (!booking) return;

    const getBooking = async () => {
      try {
        const trainer = await booking.trainerId.get();

        setTrainerBooking({
          date: getFormattedDateFromSeconds(booking.date.seconds),
          time: booking.slot,
          trainer: trainer.data()?.name,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getBooking();
  }, [trainerBookings]);

  useEffect(() => {
    const booking = classBookings[0];
    if (!booking) return;

    const getBooking = async () => {
      try {
        const c = await booking.classId.get();

        setClassBooking({
          date: getFormattedDateFromSeconds(booking.date.seconds),
          class: c.data()?.name,
          location: c.data()?.location,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getBooking();
  }, [classBookings]);

  if (!user) {
    return <Text>Something went really wrong</Text>;
  }

  const logout = () => {
    auth().signOut();
  };

  const renderMenuAction = (): React.ReactElement => <TopNavigationAction icon={MoreIcon} onPress={toggleMenu} />;

  const renderRightActions = (): React.ReactElement => (
    <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
      <MenuItem accessoryLeft={InfoIcon} title="Profile" />
      <MenuItem onPress={logout} accessoryLeft={LogoutIcon} title="Logout" />
    </OverflowMenu>
  );

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation
          accessoryLeft={() => {
            return OpenMenuAction(navigation.openDrawer);
          }}
          accessoryRight={renderRightActions}
          title="Home"
          alignment="center"
        />
        {loadingTrainerBookings || loadingClassBookings ? (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        ) : (
          <>
            <Text category="h4" style={styles.title}>
              Welcome {user.displayName || 'user'}!
            </Text>

            <View style={styles.bodyContainer}>
              <Card status={trainerBooking ? 'primary' : 'warning'} style={styles.card}>
                {trainerBooking ? (
                  <>
                    <Text category="h5">Upcoming Training:</Text>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Date: </Text>
                      <Text category="p1">{trainerBooking.date}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Time: </Text>
                      <Text category="p1">{trainerBooking.time?.map(t => `${t}:00`).join(' - ')}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Trainer: </Text>
                      <Text category="p1">{trainerBooking.trainer}</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.alignCenter}>
                    <Text category="h6">No upcoming class sessions!</Text>
                    <Button
                      appearance="ghost"
                      accessoryLeft={PlusIcon}
                      style={styles.bookButton}
                      size="small"
                      onPress={() => {
                        navigation.navigate('TrainersScreen');
                      }}>
                      Book a training session!
                    </Button>
                  </View>
                )}
              </Card>

              <Card status={classBooking ? 'primary' : 'warning'} style={styles.card}>
                {classBooking ? (
                  <>
                    <Text category="h5">Upcoming Class:</Text>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Date: </Text>
                      <Text category="p1">{classBooking.date}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Name: </Text>
                      <Text category="p1">{classBooking.class}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text category="h6">Location: </Text>
                      <Text category="p1">{classBooking.location}</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.alignCenter}>
                    <Text category="h6">No upcoming class sessions</Text>
                    <Button
                      appearance="ghost"
                      accessoryLeft={PlusIcon}
                      style={styles.bookButton}
                      size="small"
                      onPress={() => {
                        navigation.navigate('ClassesScreen');
                      }}>
                      Sign up for a class!
                    </Button>
                  </View>
                )}
              </Card>
            </View>
          </>
        )}
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
