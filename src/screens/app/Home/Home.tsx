import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Button, Divider, Icon, IconElement, List, ListItem, TopNavigation } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    // maxHeight: 192,
  },
});

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const Home = (): React.ReactElement => {
  const renderItemAccessory = (): React.ReactElement => <Button size="tiny">FOLLOW</Button>;
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
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <List style={styles.container} ItemSeparatorComponent={Divider} data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default Home;
