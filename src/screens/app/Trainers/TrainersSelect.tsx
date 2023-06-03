import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ImageProps, SafeAreaView, View } from 'react-native';

import {
  Avatar,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Spinner,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import { TrainersSelectNavigationProp, TrainersSelectRoute } from '../../../constants';
import { TrainerProfile } from './types';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-basic-800',
  },
  itemImage: {
    tintColor: undefined,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

interface TrainersSelectNavigationProps {
  route: TrainersSelectRoute;
  navigation: TrainersSelectNavigationProp;
}

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const TrainersSelect = ({ navigation, route }: TrainersSelectNavigationProps) => {
  const styles = useStyleSheet(themedStyles);

  const { category } = route.params;

  const onPress = (trainer: TrainerProfile) => {
    navigation.navigate('TrainerDetails', { trainer, category });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const trainersDocs = (await firestore().collection('trainers').where('level', '==', String(category)).get())
          .docs;
        setTrainers(trainersDocs.map(doc => doc.data() as TrainerProfile));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const renderItemAccessory = (trainer: TrainerProfile) => () => {
    return (
      <Button
        onPress={() => {
          onPress(trainer);
        }}
        size="tiny">
        SELECT
      </Button>
    );
  };

  const ItemImage = (props: Partial<ImageProps> | undefined) => {
    const { style } = props || {};
    return (
      <Avatar
        {...props}
        style={[style, styles.itemImage as { tintColor: undefined }]}
        source={require('../../../assets/icon.png')}
      />
    );
  };

  const renderItem = ({ item }: { item: TrainerProfile }) => (
    <ListItem
      title={item.name}
      description={item.shortDescription}
      accessoryLeft={ItemImage}
      accessoryRight={renderItemAccessory(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Select trainer" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      {loading ? (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      ) : (
        <List ItemSeparatorComponent={Divider} data={trainers} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
};

export default TrainersSelect;
