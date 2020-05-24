import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import {
  ChartWrapper,
  Content,
  Wrapper,
  Headers,
  LogoHolder,
  Subtitle,
  Title,
} from './ChartShareImage.style';
import LogoDark from 'assets/images/logoDark';
import { chartDarkMode } from 'assets/theme/palette';
import { Projections } from 'common/models/Projections';
import { ZoneChartWrapper } from 'components/Charts/ZoneChart.style';
import Chart from 'components/Charts/Chart';
import { ChartRt } from '../../../components/Charts';
import {
  optionsHospitalUsage,
  optionsPositiveTests,
  optionsContactTracing,
} from 'components/Charts/zoneUtils';
import { getMetricName } from 'common/metric';
import { Metric } from 'common/metric';
import { getChartData } from 'components/LocationPage/ChartsHolder';
import { findCountyByFips } from 'common/locations';
import { useProjections } from 'common/utils/model';
import ModelChart from 'components/Charts/ModelChart';

export default function ChartShareImage() {
  let { stateId, countyFipsId, metric } = useParams();
  const theme = useContext(ThemeContext);
  console.log('chart theme', theme);

  if (metric.length === 1) {
    metric = parseInt(metric);
  }

  let projections: Projections | undefined;
  const [countyOption] = useState(
    countyFipsId && findCountyByFips(countyFipsId),
  );
  stateId = stateId || countyOption.state_code;
  projections = useProjections(stateId, countyOption) as any;

  if (!projections) {
    return null;
  }
  const projection = projections.primary;

  const {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  } = getChartData(projection);

  return (
    <Wrapper>
      <Content>
        <Headers>
          <Title>{getMetricName(metric)}</Title>
          <Subtitle>{projection.locationName}</Subtitle>
          <LogoHolder>
            <LogoDark height={35} />
          </LogoHolder>
        </Headers>
        <ThemeProvider
          theme={{
            ...theme,
            palette: { ...theme.palette, chart: chartDarkMode },
          }}
        >
          <ChartWrapper>
            {metric === Metric.CASE_GROWTH_RATE && rtRangeData && (
              <>
                <ChartRt
                  height={238}
                  columnData={projection.getDataset('rtRange')}
                />
              </>
            )}
            {metric === Metric.POSITIVE_TESTS && testPositiveData && (
              <ZoneChartWrapper>
                <Chart
                  options={optionsPositiveTests(testPositiveData) as any}
                />
              </ZoneChartWrapper>
            )}
            {metric === Metric.HOSPITAL_USAGE && icuUtilizationData && (
              <ZoneChartWrapper>
                <Chart
                  options={optionsHospitalUsage(icuUtilizationData) as any}
                />
              </ZoneChartWrapper>
            )}
            {metric === Metric.CONTACT_TRACING && contactTracingData && (
              <ZoneChartWrapper>
                <Chart
                  options={optionsContactTracing(contactTracingData) as any}
                />
              </ZoneChartWrapper>
            )}
            {metric === 'future_projections' && (
              <ModelChart
                projections={projections}
                height={''}
                condensed={false}
                forCompareModels={false}
              />
            )}
          </ChartWrapper>
        </ThemeProvider>
      </Content>
    </Wrapper>
  );
}
