import React from 'react';
import { Result } from 'antd';
import StoreModel from 'models/StoreModel';
import { useSelector } from 'utilities/HookUtility';
import * as ErrorSelector from 'selectors/ErrorSelector';
import * as WeatherType from 'stores/weather/WeatherType';

const ErrorBox: React.FC = () => {
  const requestErrorText = useSelector((state: StoreModel) =>
    ErrorSelector.selectErrorText(state, [WeatherType.FETCH_WEATHER_FINISHED]),
  );

  if (requestErrorText) {
    return <Result status="warning" title={requestErrorText} />;
  }

  return null;
};

export default ErrorBox;
