import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

import { TrainerDetailsNavigationProp, TrainerDetailsRoute } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specialties: {
    fontStyle: 'italic',
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 18,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 30,
  },
});

interface TrainerDetailsNavigationProps {
  route: TrainerDetailsRoute;
  navigation: TrainerDetailsNavigationProp;
}

const TrainerDetail = ({ navigation, route }: TrainerDetailsNavigationProps) => {
  const { trainer } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={goBack}>
        <Text>Go back</Text>
      </Pressable>
      <Text style={styles.name}>{trainer.name}</Text>
      <Text style={styles.description}>{trainer.description}</Text>
    </SafeAreaView>
  );
};

export default TrainerDetail;
