import { SafeAreaView, StyleSheet } from 'react-native';

import { Button, Divider, Icon, IconElement, List, ListItem, TopNavigation, useTheme } from '@ui-kitten/components';

import { CategoriesSelectNavigationProp } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(5).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const CategoriesSelect = ({ navigation }: { navigation: CategoriesSelectNavigationProp }) => {
  const onPress = (category: number) => {
    navigation.navigate('TrainersSelect', { category });
  };

  const theme = useTheme();

  const renderItemAccessory = (index: number) => (): React.ReactElement =>
    (
      <Button
        onPress={() => {
          onPress(index + 1);
        }}
        size="tiny">
        SELECT
      </Button>
    );
  const renderItemIcon = (props: any): IconElement => <Icon {...props} name="checkmark-circle-2-outline" />;

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`Category ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory(index + 1)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Select trainer category" alignment="center" />
      <Divider />
      <List
        style={{ backgroundColor: theme['color-basic-100'] }}
        ItemSeparatorComponent={Divider}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default CategoriesSelect;
