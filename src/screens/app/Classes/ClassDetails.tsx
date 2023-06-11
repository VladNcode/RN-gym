import { Dimensions, Image, ImageProps, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { ClassDetailsNavigationProp, ClassDetailsRoute } from '../../../constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  text: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  footerControl: {
    marginHorizontal: 2,
  },
  name: {
    marginTop: 12,
  },
  alignCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },
  image: { width, height: 200, borderRadius: 0 },
  divider: {
    marginVertical: 16,
  },

  bookSession: {
    marginHorizontal: 50,
    marginTop: 30,
    marginBottom: 20,
  },
});

interface ClassDetailsNavigationProps {
  route: ClassDetailsRoute;
  navigation: ClassDetailsNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const ClassDetails = ({ navigation, route }: ClassDetailsNavigationProps) => {
  const { classInfo } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.container}>
        <TopNavigation title="Class info" alignment="center" accessoryLeft={BackAction} />
        <Layout style={styles.layoutContainer} level="1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.alignCenter}>
              <Image source={require('../../../assets/icon.png')} style={styles.image} />

              <Text style={styles.name} category="h4">
                {classInfo.name}
              </Text>

              <Text style={styles.name} category="h6">
                A class by: {classInfo.instructor}
              </Text>

              <Text style={styles.name} category="h6">
                Location: {classInfo.location}
              </Text>
            </View>

            <Divider style={styles.divider} />

            <Text category="p1" style={styles.text}>
              {classInfo.longDescription}
            </Text>

            <Divider style={styles.divider} />

            <Text category="s1" style={styles.alignCenter}>
              {classInfo.dateAndTime}
            </Text>

            <Button
              onPress={() => {
                navigation.navigate('ClassAppointment', { classInfo });
              }}
              style={styles.bookSession}
              size="small">
              SIGN UP FOR THIS CLASS
            </Button>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default ClassDetails;
