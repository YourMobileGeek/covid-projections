import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'components/Charts/utils';
import { Projection, TRACERS_NEEDED_PER_CASE } from 'common/models/Projection';

export const METRIC_NAME = 'Contacts traced';

const SHORT_DESCRIPTION_LOW = 'Too many cases and too little tracing';
const SHORT_DESCRIPTION_MEDIUM =
  'Insufficient tracing to stop the spread of COVID';
const SHORT_DESCRIPTION_HIGH = 'Enough tracing to help contain COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.07;
const LIMIT_MEDIUM = 0.7;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

export const REVERSE_ORDER = true;

export const CONTACT_TRACING_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: () => SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => SHORT_DESCRIPTION_UNKNOWN,
  },
};

export function contactTracingStatusText(projection: Projection) {
  const currentContactTracers = projection.currentContactTracers;
  const currentWeeklyAverage =
    projection.getWeeklyAverageCaseForDay() &&
    Math.round(projection.getWeeklyAverageCaseForDay() || 0);
  const currentContactTracingMetric = projection.currentContactTracerMetric;
  if (
    currentContactTracingMetric === null ||
    currentContactTracers === null ||
    currentWeeklyAverage === null
  ) {
    return 'No contact tracing data is available.';
  }
  const location = projection.locationName;
  const level = getLevel(Metric.CONTACT_TRACING, currentContactTracingMetric);

  const overview =
    `Per best available data, ${location} has ${formatInteger(
      currentContactTracers,
    )} contact tracers.` +
    ` With an average of ${formatInteger(
      currentWeeklyAverage,
    )} new daily cases, ` +
    `we estimate ${location} needs ${formatInteger(
      currentWeeklyAverage * TRACERS_NEEDED_PER_CASE,
    )} ` +
    `contact tracing staff to trace all new cases in 48 hours, before too ` +
    `many other people are infected.`;

  const contactTracingRate = levelText(
    level,
    `only ${formatPercent(currentContactTracingMetric)}`,
    `${formatPercent(currentContactTracingMetric)}`,
    `${formatPercent(currentContactTracingMetric)}`,
  );

  const outcomesAtLevel = levelText(
    level,
    `These low levels of tracing suggest there is either an active outbreak underway in ${location}, or almost no tracing capacity exists. Strong caution is warranted.`,
    `At these lower levels of tracing, it is unlikely ${location} will be able to successfully identify and isolate sources of disease spread fast enough to prevent new outbreaks.`,
    'When this level of tracing is coupled with widely available testing, COVID can be contained without resorting to lockdowns.',
  );

  const details =
    `This means that ${location} is likely able to trace ${contactTracingRate}` +
    ` of new COVID infections in 48 hours. ${outcomesAtLevel}`;

  return `${overview} ${details}`;
}
