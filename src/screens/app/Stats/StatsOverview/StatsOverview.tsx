import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Icon,
  IconElement,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import { RootTabParamsList, StatsOverviewDetailsNavigationProp } from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  bodyContainer: {
    padding: 25,
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    marginTop: 25,
  },
  cardButton: {
    marginTop: 16,
  },
});

interface StatsOverviewNavigationProps {
  navigation: DrawerNavigationProp<RootTabParamsList> & StatsOverviewDetailsNavigationProp;
}

const MenuIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const StatsOverview = ({ navigation }: StatsOverviewNavigationProps) => {
  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation
          accessoryLeft={() => {
            return OpenMenuAction(navigation.openDrawer);
          }}
          title="Stats overview"
          alignment="center"
        />
        {/* <Text category="h4" style={styles.title}>
          Stats
        </Text>  */}

        <View style={styles.bodyContainer}>
          <Card status="primary" style={styles.card}>
            <Text category="h5">Measurements stats</Text>
            <Button
              // appearance="ghost"
              // accessoryLeft={PlusIcon}
              style={styles.cardButton}
              size="small"
              onPress={() => {
                navigation.navigate('MeasurementsForm');
              }}>
              Add measurements stats
            </Button>

            <Button
              // appearance="ghost"
              // accessoryLeft={PlusIcon}
              style={styles.cardButton}
              size="small"
              onPress={() => {
                navigation.navigate('MeasurementsCharts');
              }}>
              View measurements stats
            </Button>
          </Card>

          <Card status="primary" style={styles.card}>
            <Text category="h5">Workout stats</Text>
            <Button
              // appearance="ghost"
              // accessoryLeft={PlusIcon}
              style={styles.cardButton}
              size="small"
              onPress={() => {
                navigation.navigate('WorkoutsForm');
              }}>
              Add workout stats
            </Button>

            <Button
              // appearance="ghost"
              // accessoryLeft={PlusIcon}
              style={styles.cardButton}
              size="small"
              onPress={() => {
                navigation.navigate('WorkoutsCharts');
              }}>
              View workout stats
            </Button>
          </Card>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default StatsOverview;
