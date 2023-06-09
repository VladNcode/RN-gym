import { SafeAreaView } from 'react-native';

import { Layout, Text, TopNavigation } from '@ui-kitten/components';

import styles from './styles';

const Map = () => {
  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation title="Gyms locations" alignment="center" />
        <Text>Map</Text>
      </SafeAreaView>
    </Layout>
  );
};

export default Map;
