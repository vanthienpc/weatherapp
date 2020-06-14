import React from 'react';
import { Row, Col } from 'antd';
import withLayout from 'views/components/WithLayout';
import SearchBox from 'views/components/SearchBox';
import ErrorBox from 'views/components/ErrorBox';
import WeatherBox from 'views/components/WeatherBox';

const Home: React.FC = () => (
  <Row justify="space-around">
    <Col xs={22} sm={20} md={18} lg={14}>
      <SearchBox />
      <ErrorBox />
      <WeatherBox />
    </Col>
  </Row>
);

export default withLayout(Home) as React.ComponentType;
