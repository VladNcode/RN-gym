import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

import { Icon, IconElement, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { RootDrawerParamsList } from '../../../constants';
import { userState } from '../../../store/user';
import styles from './styles';

const MenuIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const Home = (): React.ReactElement => {
  const user = useRecoilValue(userState);
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamsList>>();

  if (!user) {
    return <Text>Something went really wrong</Text>;
  }

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation
          accessoryLeft={() => {
            return OpenMenuAction(navigation.openDrawer);
          }}
          title="Home"
          alignment="center"
        />
        <Text>Home</Text>
        <Text>{user.displayName || 'Hello user'}</Text>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
