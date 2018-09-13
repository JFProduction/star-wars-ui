import React from 'react';
import { shallow, mount } from 'enzyme';

import VIN from './VIN';

describe('VIN', () => {
    it('should render without throwing an error', () => {
        const wrapper = shallow(<VIN />);
        expect(wrapper.find('input')).toHaveLength(1);
    });

    it('calls onFocus callback when it loses focus', () => {
        const onFocus = jest.fn();
        const mockedEvent = { target: {value : ""} };
        const wrapper = shallow(<VIN onFocus={onFocus} />);

        wrapper.find('input').simulate('blur', mockedEvent);

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalledWith(mockedEvent, false);
    });

    it('determines a possible valid VIN', () => {
        const onFocus = jest.fn();
        const mockedEvent = { target: {value: "JH4TB2H26CC000000"} };
        const wrapper = shallow(<VIN onFocus={onFocus} />);

        wrapper.find('input').simulate('blur', mockedEvent);

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalledWith(mockedEvent, false);
    });

    it('determines an invalid VIN', () => {
        const onFocus = jest.fn();
        const mockedEvent = { target: {value: "JH4TB2H"} };
        const wrapper = shallow(<VIN onFocus={onFocus} />);

        wrapper.find('input').simulate('blur', mockedEvent);

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalledWith(mockedEvent, true);
    });

    it('restricts keys i,I,q,Q', () => {
        const mockedFunction = jest.fn();
        const wrapper = shallow(<VIN />);

        const input = wrapper.find('input');
        input.simulate('keydown', { key: 'i', preventDefault: mockedFunction });
        input.simulate('keydown', { key: 'a', preventDefault: mockedFunction });
        input.simulate('keydown', { key: 'q', preventDefault: mockedFunction });
        input.simulate('keydown', { key: 'I', preventDefault: mockedFunction });
        input.simulate('keydown', { key: 'A', preventDefault: mockedFunction });
        input.simulate('keydown', { key: 'Q', preventDefault: mockedFunction });

        expect(mockedFunction).toHaveBeenCalledTimes(4);
    });
});
