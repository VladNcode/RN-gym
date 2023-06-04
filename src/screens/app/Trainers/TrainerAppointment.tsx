import { useState } from 'react';
import { Image, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';

import {
  Button,
  Datepicker,
  Divider,
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import { TrainerAppointmentNavigationProp, TrainerAppointmentRoute } from '../../../constants';

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
  const themeStyles = useStyleSheet(themedStyles);

  const { trainer } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));

  return (
    <SafeAreaView style={themeStyles.container}>
      <TopNavigation title="Book a training session" alignment="center" accessoryLeft={BackAction} />
      <Layout style={styles.layoutContainer} level="1">
        <View style={styles.alignCenter}>
          <Image source={require('../../../assets/icon.png')} style={styles.image} />

          <Text style={styles.name} category="h4">
            {trainer.name}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Text category="h6">{`Selected date: ${date.toLocaleDateString()}`}</Text>

        <Datepicker date={date} onSelect={setDate} />

        <Select selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>

        <Divider style={styles.divider} />

        <View style={styles.footerContainer}>
          <Button style={styles.footerControl} size="small" status="basic">
            CANCEL
          </Button>
          <Button style={styles.footerControl} size="small">
            ACCEPT
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default TrainerAppointment;
