import { ImageProps, SafeAreaView, View } from 'react-native';

import {
  Button,
  Divider,
  Icon,
  IconElement,
  Layout,
  List,
  ListItem,
  Spinner,
  TopNavigation,
} from '@ui-kitten/components';

import { SelectLocationsDetailsNavigationProp } from '../../../constants';
import useFetchData from '../../../hooks/useFetchData';
import styles from './styles';
import { GymInfo } from './types';

interface SelectLocationsDetailsNavigationProps {
  navigation: SelectLocationsDetailsNavigationProp;
}

const SelectLocations = ({ navigation }: SelectLocationsDetailsNavigationProps) => {
  const [gyms, loading] = useFetchData<GymInfo>('gyms');

  const renderItemAccessory = (item: GymInfo): React.ReactElement => (
    <Button
      onPress={() => {
        navigation.navigate('Map', { gymInfo: item });
      }}
      size="tiny">
      SELECT
    </Button>
  );

  const renderItemIcon = (props: Partial<ImageProps> | undefined): IconElement => (
    <Icon {...props} name="globe-outline" />
  );

  const renderItem = ({ item }: { item: GymInfo }) => (
    <ListItem
      title={item.name}
      description={item.address}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => {
        return renderItemAccessory(item);
      }}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation title="Gyms locations" alignment="center" />
        {loading ? (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        ) : (
          <List data={gyms} renderItem={renderItem} ItemSeparatorComponent={Divider} />
        )}
      </SafeAreaView>
    </Layout>
  );
};

export default SelectLocations;
