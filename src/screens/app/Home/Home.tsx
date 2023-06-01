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

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface IListItem {
  title: string;
  description: string;
}

const MenuIcon = (props: any): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const Home = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<any>();

  const renderItemAccessory = (): React.ReactElement => (
    <Button onPress={() => navigation.openDrawer()} size="tiny">
      FOLLOW
    </Button>
  );
  const renderItemIcon = (props: any): IconElement => <Icon {...props} name="person" />;

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
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
      <List ItemSeparatorComponent={Divider} data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default Home;
