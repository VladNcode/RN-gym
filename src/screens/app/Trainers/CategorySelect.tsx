import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { CategoriesSelectNavigationProp } from '../../../constants';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryButtonText: {
    fontSize: 18,
  },
});

const CategoriesSelect = ({ navigation }: { navigation: CategoriesSelectNavigationProp }) => {
  const categories = [1, 2, 3, 4, 5];

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Trainers</Text>

      <FlatList
        style={styles.scrollContainer}
        data={categories}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => {
              navigation.navigate('TrainersSelect', { category });
            }}>
            <Text style={styles.categoryButtonText}>Category {category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesSelect;
