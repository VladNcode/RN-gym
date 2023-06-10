import { ImageProps, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Card, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { MapDetailsNavigationProp, MapDetailsRoute } from '../../../constants';
import styles from './styles';
import { GymInfo } from './types';

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

interface MapDetailsNavigationProps {
  route: MapDetailsRoute;
  navigation: MapDetailsNavigationProp;
}

const Map = ({ navigation, route }: MapDetailsNavigationProps) => {
  const { gymInfo } = route.params;
  const { name, description, info, hours, latitude, longitude, address } = gymInfo;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = hours;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const renderMarker = (item: GymInfo) => (
    <Marker
      key={item.name}
      title={item.name}
      description={item.description}
      coordinate={{ latitude: item.latitude, longitude: item.longitude }}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation title="Gym info" alignment="center" accessoryLeft={BackAction} />
        <Text style={styles.address} category="label">
          {address}
        </Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {renderMarker(gymInfo)}
        </MapView>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <Text category="h3">{name}</Text>
            <Text style={styles.description} category="s2">
              {description}
            </Text>
            <Text category="s2">{info}</Text>

            <Divider style={styles.divider} />

            <Text category="h5">Working Hours:</Text>

            <Layout style={styles.hoursContainer}>
              <Text style={styles.hours} category="label">
                Monday: {monday},
              </Text>
              <Text style={styles.hours} category="label">
                Friday: {friday},
              </Text>
              <Text style={styles.hours} category="label">
                Tuesday: {tuesday},
              </Text>
              <Text style={styles.hours} category="label">
                Saturday: {saturday},
              </Text>
              <Text style={styles.hours} category="label">
                Wednesday: {wednesday},
              </Text>
              <Text style={styles.hours} category="label">
                Sunday: {sunday}
              </Text>
              <Text style={styles.hours} category="label">
                Thursday: {thursday},
              </Text>
            </Layout>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Map;
