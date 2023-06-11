import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Controller, useForm } from 'react-hook-form';
import { ImageProps, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { Button, Datepicker, Input, Layout, NativeDateService, Spinner, Text } from '@ui-kitten/components';

import ErrorCaption from '../../../../components/ErrorCaption';
import { userState } from '../../../../store/user';
import styles from './styles';

interface Workout {
  name: string;
  date: Date;
  duration: string;
  caloriesBurned: string;
  userId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

interface FirebaseWorkout {
  name: string;
  date: Date;
  duration: number;
  caloriesBurned: number;
  userId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

const LoadingIndicator = (props: Partial<ImageProps> | undefined): React.ReactElement => (
  <View style={[props?.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const WorkoutsScreen = () => {
  const user = useRecoilValue(userState);
  const userRef = firestore().doc(`users/${user?.uid}`);

  const now = new Date();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<Workout>({
    defaultValues: {
      name: '',
      date: now,
      duration: '',
      caloriesBurned: '',
      userId: userRef,
    },
  });

  const onSubmit = async (data: Workout) => {
    try {
      const doc: FirebaseWorkout = {
        ...data,
        duration: +data.duration,
        caloriesBurned: +data.caloriesBurned,
      };

      console.log(doc);
      // await firestore().collection('workouts').add(doc);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateService = new NativeDateService('en', { format: 'DD/MM/YYYY' });

  return (
    <Layout style={styles.container}>
      <Text category="h3">Add Workout</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              label="Workout name"
              placeholder="Workout name"
              onChangeText={onChange}
              onBlur={onBlur}
              status={errors.name && isSubmitted ? 'danger' : 'basic'}
              caption={errors.name && isSubmitted ? ErrorCaption('This field is required') : undefined}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Datepicker
              label="Workout date"
              dateService={formatDateService}
              style={styles.input}
              min={new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())}
              max={now}
              date={value}
              onSelect={onChange}
            />
          )}
        />

        <Controller
          name="duration"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              value={String(value)}
              keyboardType="number-pad"
              label="Duration (mins)"
              placeholder="Duration (mins)"
              caption={errors.duration && isSubmitted ? ErrorCaption('This field is required') : undefined}
              status={errors.duration && isSubmitted ? 'danger' : 'basic'}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          name="caloriesBurned"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              value={String(value)}
              keyboardType="number-pad"
              label="Calories Burned"
              placeholder="Calories Burned"
              caption={errors.caloriesBurned && isSubmitted ? ErrorCaption('This field is required') : undefined}
              status={errors.caloriesBurned && isSubmitted ? 'danger' : 'basic'}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>

      <Button
        style={styles.button}
        disabled={isSubmitting}
        appearance={isSubmitting ? 'outline' : 'filled'}
        accessoryLeft={isSubmitting ? LoadingIndicator : undefined}
        onPress={handleSubmit(onSubmit)}>
        Save Workout
      </Button>
    </Layout>
  );
};

export default WorkoutsScreen;
