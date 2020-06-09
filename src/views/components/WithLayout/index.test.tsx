import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import withLayout from '.';

const setup = () => {
  const ComposedComponent = () => <h1>Weather Application</h1>;

  const ComponentWithLayout = withLayout(ComposedComponent);

  const wrapper = shallow(<ComponentWithLayout />);

  return { wrapper };
};

it('render should match the snapshot', () => {
  const { wrapper } = setup();
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('render component with header is weather application', () => {
  const { wrapper } = setup();
  expect(wrapper.html()).toContain('Weather Application');
});
