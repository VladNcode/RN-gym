import { ImageProps, SafeAreaView, StyleSheet } from 'react-native';

import {
  Avatar,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';

import { TrainersSelectNavigationProp, TrainersSelectRoute } from '../../../constants';
import { Trainer } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemImage: {
    tintColor: undefined,
  },
});

const trainersList: Trainer[] = [
  {
    id: 1,
    name: 'Trainer 1',
    description: 'Trainer 1 description',
    category: 1,
  },
  {
    id: 2,
    name: 'Trainer 2',
    description: 'Trainer 2 description',
    category: 1,
  },
  {
    id: 3,
    name: 'Trainer 3',
    description: 'Trainer 3 description',
    category: 2,
  },
  {
    id: 4,
    name: 'Trainer 4',
    description: 'Trainer 4 description',
    category: 2,
  },
  {
    id: 5,
    name: 'Trainer 5',
    description: 'Trainer 5 description',
    category: 3,
  },
  {
    id: 6,
    name: 'Trainer 6',
    description: 'Trainer 6 description',
    category: 3,
  },
  {
    id: 7,
    name: 'Trainer 7',
    description: 'Trainer 7 description',
    category: 4,
  },
  {
    id: 8,
    name: 'Trainer 8',
    description: 'Trainer 8 description',
    category: 4,
  },
  {
    id: 9,
    name: 'Trainer 9',
    description: 'Trainer 9 description',
    category: 5,
  },
  {
    id: 10,
    name: 'Trainer 10',
    description: 'Trainer 10 description',
    category: 5,
  },
];

interface TrainersSelectNavigationProps {
  route: TrainersSelectRoute;
  navigation: TrainersSelectNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainersSelect = ({ navigation, route }: TrainersSelectNavigationProps) => {
  const { category } = route.params;

  const theme = useTheme();

  const onPress = (trainer: Trainer) => {
    navigation.navigate('TrainerDetails', { trainer });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const renderItemAccessory = (trainer: Trainer) => () => {
    return (
      <Button
        onPress={() => {
          onPress(trainer);
        }}
        size="tiny">
        SELECT
      </Button>
    );
  };

  const ItemImage = (props: Partial<ImageProps> | undefined) => {
    const { style } = props || {};
    return <Avatar {...props} style={[style, styles.itemImage]} source={require('../../../assets/icon.png')} />;
  };

  const renderItem = ({ item }: { item: Trainer }) => (
    <ListItem
      title={item.name}
      description={item.description}
      accessoryLeft={ItemImage}
      accessoryRight={renderItemAccessory(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Select trainer" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <List
        style={{ backgroundColor: theme['color-basic-100'] }}
        ItemSeparatorComponent={Divider}
        data={trainersList.filter(trainer => trainer.category === category)}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default TrainersSelect;
