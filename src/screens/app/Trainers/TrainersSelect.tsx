import { ImageProps, SafeAreaView, View } from 'react-native';

import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Spinner,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

import { TrainersSelectNavigationProp, TrainersSelectRoute } from '../../../constants';
import useFetchData from '../../../hooks/useFetchData';
import { TrainerProfile } from './types';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
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

  const [trainers, loading] = useFetchData<TrainerProfile>('trainers', ['level', '==', String(category)]);

  const onPress = (trainer: TrainerProfile) => {
    navigation.navigate('TrainerDetails', { trainer, category });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

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
    <Layout style={styles.container} level="1">
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
    </Layout>
  );
};

export default TrainersSelect;
