import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import IStore from 'models/IStore';
import { useSelector } from 'utilities/HookUtility';
import { WeatherModel } from 'stores/weather/models/WeatherModel';
import * as WeatherType from 'stores/weather/WeatherType';
import * as WeatherSelector from 'selectors/WeatherSelector';
import * as ErrorSelector from 'selectors/ErrorSelector';

const BoxContainer = styled(Row).attrs(() => ({
  gutter: 16,
}))`
  padding: 16px 0;
`;

const BoxCard = styled(Col).attrs(() => ({
  xs: 24,
  sm: 24,
  md: 8,
}))`
  margin-bottom: 16px;
`;

const DayOfWeek = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const TemperRange = styled.span`
  display: block;
`;

const WeatherCard: React.FC<WeatherModel> = ({ dayOfWeek, temperMin, temperMax }) => {
  return (
    <BoxCard>
      <Card hoverable>
        <DayOfWeek>{dayOfWeek}</DayOfWeek>
        <TemperRange>
          {temperMin} - {temperMax}
        </TemperRange>
      </Card>
    </BoxCard>
  );
};

const WeatherBox: React.FC = () => {
  const [weather, setWeather] = React.useState(undefined as WeatherModel[] | undefined);
  const selectError = useSelector((state: IStore) =>
    ErrorSelector.selectError(state, [WeatherType.FETCH_WEATHER_FINISHED]),
  );
  const selectWeatherListWithFiveDays = useSelector((state: IStore) =>
    WeatherSelector.selectWeatherListWithFiveDays(state),
  );

  React.useEffect(() => {
    setWeather(selectWeatherListWithFiveDays);
    if (Object.keys(selectError).length) {
      setWeather(undefined);
    }
  }, [selectWeatherListWithFiveDays, selectError]);

  if (weather) {
    return (
      <BoxContainer>
        {weather.map((item: WeatherModel) => (
          <WeatherCard key={item.id} {...item} />
        ))}
      </BoxContainer>
    );
  }

  return null;
};

export default WeatherBox;
