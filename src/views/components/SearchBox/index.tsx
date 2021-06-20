import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import IStore from 'models/StoreModel';
import { useDispatch, useSelector } from 'utilities/HookUtility';
import { selectRequest } from 'selectors/RequestSelector';
import * as WeatherAction from 'stores/weather/WeatherAction';
import * as WeatherType from 'stores/weather/WeatherType';

const { Search } = Input;

const SearchField = styled(Search).attrs((props: SearchProps) => ({
  size: 'large',
  loading: props.loading,
}))`
  height: 46px;
`;

const SearchBox: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  const isRequest: boolean = useSelector((state: IStore) =>
    selectRequest(state, [WeatherType.FETCH_WEATHER_REQUEST]),
  );

  const onSearch = (value: string) => value && dispatch(WeatherAction.fetchWeatherRequest(value));

  return <SearchField placeholder="Enter city name..." onSearch={onSearch} loading={isRequest} />;
};

export default SearchBox;
