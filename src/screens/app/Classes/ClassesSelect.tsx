import React from 'react';
import { ImageProps, SafeAreaView, View } from 'react-native';

import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Spinner,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';

import { ClassSelectNavigationProp, ClassSelectRoute } from '../../../constants';
import useFetchData from '../../../hooks/useFetchData';
import { GymClass } from './types';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

interface ClassSelectNavigationProps {
  route: ClassSelectRoute;
  navigation: ClassSelectNavigationProp;
}

const ClassesSelect = ({ navigation }: ClassSelectNavigationProps): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const renderItemAccessory = (classInfo: GymClass): React.ReactElement => (
    <Button onPress={() => navigation.navigate('ClassDetails', { classInfo })} size="tiny">
      SELECT
    </Button>
  );
  const renderItemIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="clock-outline" />;

  const [classes, loading] = useFetchData<GymClass>('classes');

  const renderItem = ({ item }: { item: GymClass }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={item.shortDescription}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => {
        return renderItemAccessory(item);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Select class" alignment="center" />
      <Divider />

      {loading ? (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      ) : (
        <List ItemSeparatorComponent={Divider} data={classes} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
};

export default ClassesSelect;
