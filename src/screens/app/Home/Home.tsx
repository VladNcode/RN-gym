import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';

import {
  Button,
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import { gymClasses } from '../../../mock/gymClasses';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface GymClass {
  name: string;
  dateAndTime: string;
  location: string;
  instructor: string;
  shortDescription: string;
  longDescription: string;
}

const MenuIcon = (props: any): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const Home = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<any>();

  const renderItemAccessory = (): React.ReactElement => (
    <Button onPress={() => navigation.openDrawer()} size="tiny">
      SELECT
    </Button>
  );
  const renderItemIcon = (props: any): IconElement => <Icon {...props} name="clock-outline" />;

  const renderItem = ({ item }: { item: GymClass }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={item.shortDescription}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        accessoryLeft={() => {
          return OpenMenuAction(navigation.openDrawer);
        }}
        title="Home"
        alignment="center"
      />
      <Divider />
      <List ItemSeparatorComponent={Divider} data={gymClasses} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default Home;
