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
  useStyleSheet,
} from '@ui-kitten/components';

import { CategoriesSelectNavigationProp } from '../../../constants';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface IListItem {
  level: number;
  description: string;
}

const categories = [
  {
    level: 1,
    description: 'Novice Trainer - A beginner with limited experience, providing basic fitness advice.',
  },
  {
    level: 2,
    description:
      'Competent Trainer - Possesses a solid foundation of training principles, designs basic workouts, and offers general nutrition advice.',
  },
  {
    level: 3,
    description:
      'Skilled Trainer - Proficient in various fitness disciplines, creates personalized programs, and specializes in specific areas.',
  },
  {
    level: 4,
    description:
      'Advanced Trainer - Highly skilled and knowledgeable, designs comprehensive programs, and stays up-to-date with the latest research.',
  },
  {
    level: 5,
    description:
      'The pinnacle of excellence, widely recognized for exceptional skills, often works with professionals, and contributes to industry advancement.',
  },
];

const CategoriesSelect = ({ navigation }: { navigation: CategoriesSelectNavigationProp }) => {
  const styles = useStyleSheet(themedStyles);

  const onPress = (category: number) => {
    navigation.navigate('TrainersSelect', { category });
  };

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
      title={`Level ${item.level}`}
      description={item.description}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory(index)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Select trainer category" alignment="center" />
      <Divider />
      <List ItemSeparatorComponent={Divider} data={categories} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default CategoriesSelect;
