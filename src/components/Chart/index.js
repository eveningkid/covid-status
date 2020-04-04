import React, { useEffect, useState } from 'react';
import { Dimensions, LayoutAnimation, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { iOSUIKit } from 'react-native-typography';
import { useColorScheme } from 'react-native-appearance';
import { DarkTheme } from '@react-navigation/native';
import moment from 'moment';
import thousands from 'thousands';
import ActivityIndicator from '../ActivityIndicator';
import LineSeparator from '../LineSeparator';
import Text from '../Text';
import API from '../../helpers/api';
import { isDark as isDarkScheme } from '../../helpers/color';

function Chart({ country, criticalCases, today, statsPerMillion, updatedAt }) {
  const [isLoading, setIsLoading] = useState(true);
  const [casesHistory, setCasesHistory] = useState([]);
  const [deathsHistory, setDeathsHistory] = useState([]);
  const scheme = useColorScheme();
  const isDark = isDarkScheme(scheme);

  useEffect(() => {
    setIsLoading(true);

    API.fetchHistory(country)
      .then(({ cases, deaths }) => {
        setCasesHistory(cases);
        setDeathsHistory(deaths);
      })
      .catch(error => {
        setCasesHistory([]);
        setDeathsHistory([]);
      })
      .finally(() => {
        LayoutAnimation.easeInEaseOut();
        setIsLoading(false);
      });
  }, [country]);

  const lastWeekCases =
    casesHistory.length > 0 &&
    casesHistory[casesHistory.length - 1][1] -
      casesHistory[casesHistory.length - 8][1];

  const lastMonthCases =
    casesHistory.length > 0 &&
    casesHistory[casesHistory.length - 1][1] -
      casesHistory[casesHistory.length - 31][1];

  const data = {
    labels: casesHistory.map(_ => ''),
    datasets: [
      { data: casesHistory.map(([_, count]) => count), color: () => 'tomato' }
    ]
  };

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator />
      </View>
    );
  }

  if (casesHistory.length === 0) {
    return (
      <View
        style={[styles.containerNoData, isDark && styles.containerNoDataDark]}
      >
        <Text style={[iOSUIKit.body, styles.noDataText]}>No data found</Text>
      </View>
    );
  }

  return (
    <>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={220}
        fromZero
        yLabelsOffset={8}
        xLabelsOffset={0}
        formatYLabel={thousands}
        chartConfig={{
          decimalPlaces: 0,
          color: (opacity = 1) =>
            isDark ? DarkTheme.colors.text : `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) =>
            isDark ? DarkTheme.colors.text : `rgba(0, 0, 0, ${opacity})`,
          fillShadowGradient: 'tomato',
          fillShadowGradientOpacity: 0.3,
          backgroundColor: isDark ? DarkTheme.colors.card : 'white',
          backgroundGradientFrom: isDark ? DarkTheme.colors.card : 'white',
          backgroundGradientTo: isDark ? DarkTheme.colors.card : 'white',
          propsForDots: {
            r: 1,
            strokeWidth: 1
          }
        }}
        fromZero
        bezier
        withInnerLines={false}
        verticalLabelRotation={30}
        style={styles.chart}
      />

      <View style={styles.updatedAtContainer}>
        <Text style={[iOSUIKit.footnote, styles.updatedAtText]}>
          Data from {deathsHistory[0][0]} to{' '}
          {deathsHistory[deathsHistory.length - 1][0]}
        </Text>
        <Text style={[iOSUIKit.footnote, styles.updatedAtText]}>
          Updated {moment(updatedAt).fromNow()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Last Week</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(lastWeekCases)} cases{' '}
          <Text
            importantStyle={[
              styles.figureTodayCase,
              isDark && styles.figureTodayCaseDark
            ]}
          >
            + {thousands(today.cases)} today
          </Text>
        </Text>
      </View>

      <LineSeparator />

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Last Month</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(lastMonthCases)} cases
        </Text>
      </View>

      <LineSeparator />

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Deaths Today</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(today.deaths)} deaths
        </Text>
      </View>

      <LineSeparator />

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Critical Cases</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(criticalCases)} cases
        </Text>
      </View>

      <LineSeparator />

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Cases per one million</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(statsPerMillion.cases)} cases
        </Text>
      </View>

      <LineSeparator />

      <View style={styles.row}>
        <Text style={iOSUIKit.body}>Deaths per one million</Text>
        <Text style={[iOSUIKit.body, styles.figure]}>
          {thousands(statsPerMillion.deaths)} deaths
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerNoData: {
    flex: 1,
    height: 190,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8
  },
  containerNoDataDark: {
    backgroundColor: DarkTheme.colors.background
  },
  noDataText: {
    opacity: 0.4
  },
  chart: {
    marginLeft: -15,
    marginBottom: -30,
    marginTop: 45
  },
  updatedAtContainer: {
    flex: 1,
    opacity: 0.6,
    marginBottom: 30
  },
  updatedAtText: {
    textAlign: 'right'
  },
  row: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  figure: {
    opacity: 0.6
  },
  figureTodayCase: {
    color: 'rgb(52, 199, 89)'
  },
  figureTodayCaseDark: {
    // See: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color
    color: 'rgb(48, 209, 88)'
  }
});

export default Chart;
