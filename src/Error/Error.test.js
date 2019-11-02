import React from 'react';
import Error from './Error';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Error', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Error />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('should call function handleClose', () => {
  //     const wrapper = shallow(<Error />);
  //     const button = wrapper.find('.btn-msg-close');
  //     let spyHandleClose = jest.spyOn(Error.prototype, 'handleClose');
  //     button.simulate('click');
  //     expect(spyHandleClose).toHaveBeenCalled();

  //     // let spySetOpen = jest.spyOn();
  //     // expect(spyScrollTo).toHaveBeenCalled();
  //   });
});
