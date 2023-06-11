import { Dimensions, ImageProps, SafeAreaView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import { Icon, Layout, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { StatsMeasurmentsChartsNavigationProp } from '../../../../../constants';
import useFetchData from '../../../../../hooks/useFetchData';
import { getFormattedDateFromSeconds } from '../../../Home/Home';
import { FirebaseWorkout } from '../../WorkoutsForm/WorkoutsForm';

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

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const [workouts, loading] = useFetchData<Omit<FirebaseWorkout, 'date'> & { date: { seconds: number } }>('workouts', [
    'date',
    '>=',
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
  ]);

  console.log(workouts);

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
          <TopNavigation title="Workouts charts" alignment="center" accessoryLeft={BackAction} />
          {loading ? (
            <View style={styles.spinner}>
              <Spinner size="giant" />
            </View>
          ) : !workouts.length ? (
            <Text>No data</Text>
          ) : (
            <>
              <Text style={styles.textCenter} category="h4">
                Calories burned
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={{
                    labels: workouts.map(item => getFormattedDateFromSeconds(item.date.seconds)),
                    datasets: [{ data: workouts.map(item => item.caloriesBurned) }],
                  }}
                  width={width * 2}
                  height={260}
                  yAxisSuffix="cal"
                  transparent
                  bezier
                  withVerticalLines={false}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  chartConfig={{ ...chartConfig, decimalPlaces: 0 }}
                  style={styles.chart}
                  verticalLabelRotation={22}
                  renderDotContent={renderDotContent('cal')}
                />
              </ScrollView>

              <Text style={styles.textCenter} category="h4">
                Duration
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={{
                    labels: workouts.map(item => getFormattedDateFromSeconds(item.date.seconds)),
                    datasets: [{ data: workouts.map(item => item.duration) }],
                  }}
                  width={width * 2}
                  height={260}
                  yAxisSuffix="min"
                  transparent
                  bezier
                  withVerticalLines={false}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  chartConfig={{ ...chartConfig, decimalPlaces: 0 }}
                  style={styles.chart}
                  verticalLabelRotation={22}
                  renderDotContent={renderDotContent('min')}
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
