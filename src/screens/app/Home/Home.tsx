import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Button,
  Card,
  Icon,
  IconElement,
  Modal,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import PaymentPage from './PaymentPage';

const { width } = Dimensions.get('window');

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    // backgroundColor: 'color-basic-800',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const MenuIcon = (props: any): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const Home = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<any>();

  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        accessoryLeft={() => {
          return OpenMenuAction(navigation.openDrawer);
        }}
        title="Home"
        alignment="center"
      />
      <PaymentPage />
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
        <Card style={{ width: width * 0.8 }} disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>DISMISS</Button>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
