import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { CategoriesSelectNavigationProp } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

const CategoriesSelect = ({ navigation }: { navigation: CategoriesSelectNavigationProp }) => {
  const categories = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            key={category}
            style={styles.button}
            onPress={() => {
              navigation.navigate('TrainersSelect', { category });
            }}>
            <Text style={styles.buttonText}>Category {category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesSelect;
