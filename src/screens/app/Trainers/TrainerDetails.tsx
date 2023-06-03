import { Image, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';

import {
  Button,
  Divider,
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
  name: {
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  image: { width: 200, height: 200, borderRadius: 100 },
  divider: {
    marginVertical: 16,
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

  const { trainer, category } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  return (
    <SafeAreaView style={themeStyles.container}>
      <TopNavigation title="Trainer info" alignment="center" accessoryLeft={BackAction} />
      <Layout style={styles.layoutContainer} level="1">
        <View style={styles.alignCenter}>
          <Image source={require('../../../assets/icon.png')} style={styles.image} />
          <Text style={styles.name} category="h6">
            Level {category} trainer
          </Text>
          <Text style={styles.name} category="h4">
            {trainer.name}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.name} category="label">
          Certifications: {trainer.certifications}
        </Text>
        <Text style={styles.name} category="label">
          Areas of expertise: {trainer.areasOfExpertise}
        </Text>

        <Text category="p1" style={styles.text}>
          {trainer.longDescription}
        </Text>

        <Divider style={styles.divider} />

        <Text category="s1">Available: {trainer.availability}</Text>

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
