import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text, IconButton} from 'react-native-paper';
import Svg, {Path, Circle} from 'react-native-svg';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';

type SpentItem = {
  name: string;
  spent: string;
  color: string;
};
``;

type ParsedItem = SpentItem & {
  value: number;
};

type Segment = ParsedItem & {
  startAngle: number;
  endAngle: number;
};

type Props = {
  spentItems: SpentItem[];
};

const CHART_SIZE = 160;
const CENTER = CHART_SIZE / 2;

const RING_THICKNESS = 16;
const RING_GAP = 8;
const START_ANGLE = 0;

const OUTER_RADIUS_1 = CHART_SIZE / 2 - 8;
const INNER_RADIUS_1 = OUTER_RADIUS_1 - RING_THICKNESS;

const OUTER_RADIUS_2 = INNER_RADIUS_1 - RING_GAP;
const INNER_RADIUS_2 = OUTER_RADIUS_2 - RING_THICKNESS;

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleRad: number,
) => ({
  x: centerX + radius * Math.cos(angleRad),
  y: centerY + radius * Math.sin(angleRad),
});

const createArcPath = (
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ');
};

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

  const segments = useMemo<Segment[]>(() => {
    if (!total) {
      return [];
    }

    const fullCircle = Math.PI * 2;
    let currentAngle = START_ANGLE;

    return parsedItems.map(item => {
      const angle = (item.value / total) * fullCircle;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      return {...item, startAngle, endAngle};
    });
  }, [parsedItems, total]);

  const renderSegment = useCallback((segment: Segment) => {
    if (
      !segment.value ||
      segment.startAngle === segment.endAngle ||
      !isFinite(segment.startAngle) ||
      !isFinite(segment.endAngle)
    ) {
      return null;
    }

    const outerPath = createArcPath(
      CENTER,
      CENTER,
      INNER_RADIUS_1,
      OUTER_RADIUS_1,
      segment.startAngle,
      segment.endAngle,
    );

    const innerPath = createArcPath(
      CENTER,
      CENTER,
      INNER_RADIUS_2,
      OUTER_RADIUS_2,
      segment.startAngle,
      segment.endAngle,
    );

    return (
      <React.Fragment key={segment.name}>
        <Path d={outerPath} fill={segment.color} />
        <Path d={innerPath} fill={segment.color} opacity={0.9} />
      </React.Fragment>
    );
  }, []);

  const renderLegendItem = useCallback(
    (item: ParsedItem) => {
      return (
        <View key={item.name} style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: item.color}]} />
          <View style={styles.legendTextBlock}>
            <Text style={styles.legendLabel}>{item.name}</Text>
          </View>
        </View>
      );
    },
    [total],
  );

  return (
    <Surface style={styles.container} elevation={2}>
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
        style={{...styles.headerDivider, backgroundColor: theme.colors.primary}}
      />
      <View style={styles.contentRow}>
        <View style={styles.chartContainer}>
          <Svg width={CHART_SIZE} height={CHART_SIZE}>
            {segments.length === 0 && (
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={OUTER_RADIUS_2}
                fill={trackColor}
              />
            )}
            {segments.map(renderSegment)}
          </Svg>
        </View>
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
    alignSelf: 'stretch',
    opacity: 0.6,
  },
  contentRow: {
    flexDirection: 'row',
  },
  chartContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
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
  legendTextBlock: {
    flexDirection: 'column',
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 12,
    opacity: 0.8,
  },
  legendPercentage: {
    fontWeight: '600',
  },
});

export default SpentSummaryGraph;
