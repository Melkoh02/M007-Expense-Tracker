import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text, IconButton} from 'react-native-paper';
import {PieChart} from 'react-native-gifted-charts';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';

type SpentItem = {
  name: string;
  spent: string;
  color: string;
};

type ParsedItem = SpentItem & {
  value: number;
};

type Props = {
  spentItems: SpentItem[];
};

const CHART_SIZE = 160;

const SpentSummaryGraph: React.FC<Props> = ({spentItems}) => {
  const theme = useTheme();

  const trackColor = theme.colors.backdrop ?? 'rgba(255,255,255,0.06)';

  const parsedItems = useMemo<ParsedItem[]>(
    () =>
      spentItems.map(item => {
        const numeric = parseFloat(item.spent.replace(/,/g, ''));
        return {
          ...item,
          value: isNaN(numeric) ? 0 : numeric,
        };
      }),
    [spentItems],
  );

  const total = useMemo(
    () => parsedItems.reduce((sum, i) => sum + i.value, 0),
    [parsedItems],
  );

  const {outerPieData, innerPieData} = useMemo(() => {
    // Sort descending by value
    const sorted = [...parsedItems].sort((a, b) => b.value - a.value);

    const half = Math.ceil(sorted.length / 2);

    const outer = sorted.slice(0, half); // bigger spenders
    const inner = sorted.slice(half); // smaller spenders

    return {
      outerPieData: outer.map(item => ({
        value: item.value || 0.0001,
        color: item.color,
      })),
      innerPieData: inner.map(item => ({
        value: item.value || 0.0001,
        color: item.color,
      })),
    };
  }, [parsedItems]);

  const renderLegendItem = useCallback((item: ParsedItem) => {
    return (
      <View key={item.name} style={styles.legendItem}>
        <View style={[styles.legendColor, {backgroundColor: item.color}]} />
        <Text style={styles.legendLabel}>{item.name}</Text>
      </View>
    );
  }, []);

  return (
    <Surface style={styles.container} elevation={2}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryAmount}>
            $
            {total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text style={styles.summarySubtitle}>Last 30 days</Text>
        </View>
        <IconButton icon="information-outline" size={20} />
      </View>

      <View
        style={{
          ...styles.headerDivider,
          backgroundColor: theme.colors.primary,
        }}
      />

      {/* Content */}
      <View style={styles.contentRow}>
        {/* Chart */}
        <View style={styles.chartContainer}>
          {total === 0 ? (
            <View
              style={{
                height: CHART_SIZE,
                width: CHART_SIZE,
                borderRadius: CHART_SIZE / 2,
                backgroundColor: trackColor,
              }}
            />
          ) : (
            <>
              {/* Outer ring */}
              <PieChart
                data={outerPieData}
                donut
                radius={80}
                innerRadius={60}
                strokeWidth={0}
                showText={false}
                innerCircleColor={theme.colors.elevation?.level2}
              />

              {/* Inner ring */}
              <View style={styles.innerRingWrapper}>
                <PieChart
                  data={innerPieData}
                  donut
                  radius={60}
                  innerRadius={40}
                  strokeWidth={0}
                  showText={false}
                  innerCircleColor={theme.colors.elevation?.level2}
                />
              </View>
            </>
          )}
        </View>

        {/* Legend */}
        <View style={styles.legend}>{parsedItems.map(renderLegendItem)}</View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  summarySubtitle: {
    marginTop: -2,
    fontSize: 12,
    opacity: 0.7,
  },
  headerDivider: {
    marginTop: 16,
    marginBottom: 16,
    height: 2,
    opacity: 0.6,
  },
  contentRow: {
    flexDirection: 'row',
  },
  chartContainer: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  innerRingWrapper: {
    position: 'absolute',
  },
  legend: {
    flex: 1,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 24,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default SpentSummaryGraph;
