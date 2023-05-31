import { ImageProps, SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';

import {
  Button,
  Icon,
  Layout,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import { TrainerDetailsNavigationProp, TrainerDetailsRoute } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
});

interface TrainerDetailsNavigationProps {
  route: TrainerDetailsRoute;
  navigation: TrainerDetailsNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainerDetail = ({ navigation, route }: TrainerDetailsNavigationProps) => {
  const themeStyles = useStyleSheet(themedStyles);

  const { trainer } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  return (
    <SafeAreaView style={themeStyles.container}>
      <TopNavigation title="Trainer info" alignment="center" accessoryLeft={BackAction} />
      <Layout style={styles.layoutContainer} level="1">
        <View>
          <Text category="h4">{trainer.name}</Text>
          <Text category="s1">Category {trainer.category} trainer</Text>
        </View>

        <Text category="p1" style={styles.text}>
          The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian
          Sea of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the
          Asian continent
        </Text>

        <View style={styles.footerContainer}>
          <Button style={styles.footerControl} size="small" status="basic">
            CANCEL
          </Button>
          <Button style={styles.footerControl} size="small">
            ACCEPT
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default TrainerDetail;
