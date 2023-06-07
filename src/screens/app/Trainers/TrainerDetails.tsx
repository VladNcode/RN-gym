import { Image, ImageProps, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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
    paddingTop: 16,
    paddingBottom: 0,
  },
  text: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  bookSession: {
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },
  image: { width: 150, height: 150, borderRadius: 100 },
  divider: {
    marginVertical: 20,
  },
  outerWrapper: {
    backgroundColor: 'orange',
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
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.container}>
        <TopNavigation title="Trainer info" alignment="center" accessoryLeft={BackAction} />
        <Layout style={styles.layoutContainer} level="1">
          <ScrollView showsVerticalScrollIndicator={false}>
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
              Areas of expertise: {trainer.areasOfExpertise}
            </Text>

            <Text style={styles.name} category="label">
              Certifications: {trainer.certifications}
            </Text>

            <Text category="p1" style={styles.text}>
              {trainer.longDescription}
            </Text>

            <Divider style={styles.divider} />

            <Text style={styles.alignCenter} category="s1">
              Available: {trainer.availability}
            </Text>

            <Button
              onPress={() => {
                navigation.navigate('TrainerAppointment', { trainer });
              }}
              style={styles.bookSession}
              size="small">
              BOOK TRAINING SESSION
            </Button>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default TrainerDetail;
