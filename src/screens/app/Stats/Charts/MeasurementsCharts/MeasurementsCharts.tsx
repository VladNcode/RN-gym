import firestore from '@react-native-firebase/firestore';
import { Dimensions, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';

import { Icon, Layout, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { StatsMeasurmentsChartsNavigationProp } from '../../../../../constants';
import useFetchData from '../../../../../hooks/useFetchData';
import { userState } from '../../../../../store/user';
import { getFormattedDateFromSeconds } from '../../../Home/Home';
import { FirebaseWeightData } from '../../MeasurementsForm/MeasurementsForm';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  chart: {
    marginTop: 20,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 10,
  },
  labelFontSize: {
    fontSize: 10,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

interface StatsMeasurmentsChartsNavigationProps {
  navigation: StatsMeasurmentsChartsNavigationProp;
}

const renderDotContentStyles = (x: number, y: number) =>
  StyleSheet.create({
    label: {
      position: 'absolute',
      top: y - 23,
      left: x - 10,
    },
  });

const BackIcon = (props: Partial<ImageProps> | undefined) => <Icon {...props} name="arrow-back" />;

const MeasurementsCharts = ({ navigation }: StatsMeasurmentsChartsNavigationProps) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const user = useRecoilValue(userState);
  const userRef = firestore().doc(`users/${user?.uid}`);

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [measurements, loading] = useFetchData<Omit<FirebaseWeightData, 'date'> & { date: { seconds: number } }>(
    'measurements',
    ['date', '>=', new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)],
    ['userId', '==', userRef],
  );

  const renderDotContent =
    (unit: string) =>
    ({ x, y, indexData }: { x: number; y: number; indexData: number }) => {
      const style = renderDotContentStyles(x, y);

      return (
        <View key={`${x}-${y}-${indexData}`} style={style.label}>
          <Text category="label" style={styles.labelFontSize}>
            {indexData} {unit}
          </Text>
        </View>
      );
    };

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: { r: '4', strokeWidth: '1', stroke: '#ffa726' },
  };

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <Layout style={styles.layoutContainer} level="1">
          <TopNavigation title="Measurments charts" alignment="center" accessoryLeft={BackAction} />
          {loading ? (
            <View style={styles.spinner}>
              <Spinner size="giant" />
            </View>
          ) : !measurements.length ? (
            <Text>No data</Text>
          ) : (
            <>
              <Text style={styles.textCenter} category="h4">
                Weight
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={{
                    labels: measurements.map(item => getFormattedDateFromSeconds(item.date.seconds)),
                    datasets: [{ data: measurements.map(item => item.weight) }],
                  }}
                  width={width * 2}
                  height={260}
                  yAxisSuffix="kg"
                  transparent
                  bezier
                  withVerticalLines={false}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  chartConfig={chartConfig}
                  style={styles.chart}
                  verticalLabelRotation={22}
                  renderDotContent={renderDotContent('kg')}
                />
              </ScrollView>

              <Text style={styles.textCenter} category="h4">
                Waist Circumference
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={{
                    labels: measurements.map(item => getFormattedDateFromSeconds(item.date.seconds)),
                    datasets: [{ data: measurements.map(item => item.waistCircumference) }],
                  }}
                  width={width * 2}
                  height={260}
                  yAxisSuffix="cm"
                  transparent
                  bezier
                  withVerticalLines={false}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  chartConfig={{ ...chartConfig, decimalPlaces: 0 }}
                  style={styles.chart}
                  verticalLabelRotation={22}
                  renderDotContent={renderDotContent('cm')}
                />
              </ScrollView>
            </>
          )}
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default MeasurementsCharts;
