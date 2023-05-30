import { ImageProps, SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';

import { Button, Card, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

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

const Header = (props: ViewProps | undefined) => (
  <View {...props}>
    <Text category="h6">Maldives</Text>
    <Text category="s1">By Wikipedia</Text>
  </View>
);

const Footer = (props: ViewProps | undefined) => {
  const { style } = props || {};

  return (
    <View {...props} style={[style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="small" status="basic">
        CANCEL
      </Button>
      <Button style={styles.footerControl} size="small">
        ACCEPT
      </Button>
    </View>
  );
};

interface TrainerDetailsNavigationProps {
  route: TrainerDetailsRoute;
  navigation: TrainerDetailsNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainerDetail = ({ navigation, route }: TrainerDetailsNavigationProps) => {
  const { trainer } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title={trainer.name} alignment="center" accessoryLeft={BackAction} />
      <Layout style={styles.layoutContainer} level="1">
        <Header />

        <Text style={styles.text}>
          The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian
          Sea of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the
          Asian continent
        </Text>

        <Footer />
      </Layout>
    </SafeAreaView>
  );
};

export default TrainerDetail;
