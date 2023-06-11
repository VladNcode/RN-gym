import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Controller, useForm } from 'react-hook-form';
import { ImageProps, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { Button, Datepicker, Input, Layout, NativeDateService, Spinner, Text } from '@ui-kitten/components';

import ErrorCaption from '../../../../components/ErrorCaption';
import { userState } from '../../../../store/user';
import styles from './styles';

interface WeightData {
  weight: string;
  waistCircumference: string;
  hipCircumference: string;
  date: Date;
  userId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

export interface FirebaseWeightData {
  weight: number;
  waistCircumference: number;
  hipCircumference: number;
  date: Date;
  userId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

const LoadingIndicator = (props: Partial<ImageProps> | undefined): React.ReactElement => (
  <View style={[props?.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const MeasurementsScreen = () => {
  const user = useRecoilValue(userState);
  const userRef = firestore().doc(`users/${user?.uid}`);

  const now = new Date();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<WeightData>({
    defaultValues: {
      weight: '',
      waistCircumference: '',
      hipCircumference: '',
      date: now,
      userId: userRef,
    },
  });

  const onSubmit = async (data: WeightData) => {
    try {
      const doc: FirebaseWeightData = {
        ...data,
        weight: +data.weight,
        waistCircumference: +data.waistCircumference,
        hipCircumference: +data.hipCircumference,
      };

      console.log(doc);
      // await firestore().collection('measurements').add(doc);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateService = new NativeDateService('en', { format: 'DD/MM/YYYY' });

  return (
    <Layout style={styles.container}>
      <Text category="h3">Add Measurements</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="weight"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={String(value)}
              label="Weight"
              placeholder="Weight"
              onChangeText={onChange}
              onBlur={onBlur}
              status={errors.weight && isSubmitted ? 'danger' : 'basic'}
              caption={errors.weight && isSubmitted ? ErrorCaption('This field is required') : undefined}
            />
          )}
        />

        <Controller
          name="waistCircumference"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              value={String(value)}
              label="Waist Circumference (cm)"
              placeholder="Waist Circumference (cm)"
              onChangeText={onChange}
              onBlur={onBlur}
              status={errors.waistCircumference && isSubmitted ? 'danger' : 'basic'}
              caption={errors.waistCircumference && isSubmitted ? ErrorCaption('This field is required') : undefined}
            />
          )}
        />

        <Controller
          name="hipCircumference"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              value={String(value)}
              label="Hip Circumference (cm)"
              placeholder="Hip Circumference (cm)"
              onChangeText={onChange}
              onBlur={onBlur}
              status={errors.hipCircumference && isSubmitted ? 'danger' : 'basic'}
              caption={errors.hipCircumference && isSubmitted ? ErrorCaption('This field is required') : undefined}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Datepicker
              label="Select date"
              dateService={formatDateService}
              style={styles.input}
              min={new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())}
              max={now}
              date={value}
              onSelect={onChange}
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
        Save Measurements
      </Button>
    </Layout>
  );
};

export default MeasurementsScreen;
