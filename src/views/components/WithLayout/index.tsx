import React from 'react';
import { Layout } from 'antd';
import { GlobalStyled } from '../GlobalStyled';

const { Header, Content, Footer } = Layout;

const withLayout = <P extends object>(ComposedComponent: React.ComponentType<P>) => {
  const WithLayout: React.FC<P> = (props) => (
    <Layout>
      <GlobalStyled />
      <Header>
        <h1>Weather Application</h1>
      </Header>
      <Content>
        <ComposedComponent {...(props as P)} />
      </Content>
      <Footer>@2020 Created by Thien Vo</Footer>
    </Layout>
  );

  return WithLayout;
};

export default withLayout;
