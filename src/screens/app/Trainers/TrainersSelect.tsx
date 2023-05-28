import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { TrainersSelectNavigationProp, TrainersSelectRoute } from '../../../constants';
import { Trainer } from './types';

const styles = StyleSheet.create({
  container: {
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginRight: 10,
  },
  trainerItem: {
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialties: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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

const TrainersSelect = ({ navigation, route }: TrainersSelectNavigationProps) => {
  const { category } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const onPress = (trainer: Trainer) => {
    navigation.navigate('TrainerDetails', { trainer });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={goBack} hitSlop={8}>
        <Text style={styles.name}>Go back</Text>
      </Pressable>
      <Text style={styles.name}>Category {category} Trainers</Text>

      <FlatList
        style={styles.scrollContainer}
        data={trainersList.filter(trainer => trainer.category === category)}
        renderItem={({ item: trainer }) => (
          <View style={styles.trainerItem} key={trainer.id}>
            <Text>{trainer.name}</Text>
            <Text>{trainer.description}</Text>
            <Pressable onPress={() => onPress(trainer)}>
              <Text>Select trainer</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TrainersSelect;
