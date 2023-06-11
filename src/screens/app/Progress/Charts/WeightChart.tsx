import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import { Layout, Text } from '@ui-kitten/components';

import { getFormattedDateFromSeconds } from '../../Home/Home';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chart: {
    marginTop: 20,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
  },
  labelFontSize: {
    fontSize: 10,
  },
});

const renderDotContentStyles = (x: number, y: number) =>
  StyleSheet.create({
    label: {
      position: 'absolute',
      top: y - 23,
      left: x - 10,
    },
  });

const Data = [
  { weight: 72, waistCircumference: 30, hipCircumference: 34, date: new Date('2022-01-01') },
  { weight: 70, waistCircumference: 28, hipCircumference: 33, date: new Date('2022-01-02') },
  { weight: 69, waistCircumference: 27, hipCircumference: 32, date: new Date('2022-01-03') },
  { weight: 68, waistCircumference: 26, hipCircumference: 31, date: new Date('2022-01-04') },
  { weight: 67, waistCircumference: 25, hipCircumference: 30, date: new Date('2022-01-05') },
  { weight: 66, waistCircumference: 24, hipCircumference: 29, date: new Date('2022-01-06') },
  { weight: 65, waistCircumference: 23, hipCircumference: 30, date: new Date('2022-01-07') },
  { weight: 70, waistCircumference: 22, hipCircumference: 31, date: new Date('2022-01-08') },
  { weight: 71, waistCircumference: 21, hipCircumference: 32, date: new Date('2022-01-09') },
  { weight: 72, waistCircumference: 20, hipCircumference: 33, date: new Date('2022-01-10') },
  { weight: 73, waistCircumference: 19, hipCircumference: 34, date: new Date('2022-01-11') },
  { weight: 74, waistCircumference: 18, hipCircumference: 35, date: new Date('2022-01-12') },
  { weight: 72, waistCircumference: 30, hipCircumference: 34, date: new Date('2022-01-13') },
  { weight: 70, waistCircumference: 28, hipCircumference: 33, date: new Date('2022-01-14') },
  { weight: 73, waistCircumference: 19, hipCircumference: 34, date: new Date('2022-01-15') },
  { weight: 74, waistCircumference: 18, hipCircumference: 35, date: new Date('2022-01-16') },
  { weight: 72, waistCircumference: 30, hipCircumference: 34, date: new Date('2022-01-17') },
  { weight: 70, waistCircumference: 28, hipCircumference: 33, date: new Date('2022-01-18') },
];

const weightsData = Data.map(item => item.weight);
const labelsData = Data.map(item => getFormattedDateFromSeconds(item.date.getTime() / 1000));

const WeightChart = () => {
  const renderDotContent = ({ x, y, indexData }: { x: number; y: number; index: number; indexData: number }) => {
    const style = renderDotContentStyles(x, y);

    return (
      <View key={`${x}-${y}-${indexData}`} style={style.label}>
        <Text category="label" style={styles.labelFontSize}>
          {indexData} kg
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
        <Text style={styles.textCenter} category="h4">
          Weight data
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{ labels: labelsData, datasets: [{ data: weightsData }] }}
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
            renderDotContent={renderDotContent}
          />
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default WeightChart;
