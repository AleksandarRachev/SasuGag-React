import React from 'react';
import Error from './Error';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Error', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Error />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
