import React from 'react';
import { mount } from 'enzyme';

import Month from '../Month';

/* eslint-disable comma-dangle, jsx-a11y/mouse-events-have-key-events */

const tileProps = {
  classes: ['react-calendar__tile'],
  date: new Date(2018, 0, 1),
};

describe('Month', () => {
  it('renders time component with proper dateTime arguments', () => {
    const component = mount(
      <Month
        {...tileProps}
        date={new Date(2018, 0, 1)}
        month={2018}
      />
    );

    const time = component.find('time');

    expect(time).toHaveLength(1);
    expect(time.prop('dateTime')).toBe('2018-01T00:00:00.000');
    expect(time.text()).toBe('Jan');
  });

  it('is not disabled when date is after beginning of minDate\'s month', () => {
    const component = mount(
      <Month
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2018, 0, 1)}
      />
    );

    expect(component.find('span').prop('disabled')).toBeFalsy();
  });

  it('is disabled when date is after end of maxDate\'s month', () => {
    const component = mount(
      <Month
        {...tileProps}
        date={new Date(2018, 6, 1)}
        maxDate={new Date(2018, 5, 1)}
      />
    );

    expect(component.find('span').prop('disabled')).toBe(true);
  });

  it('is not disabled when date is before end of maxDate\'s month', () => {
    const component = mount(
      <Month
        {...tileProps}
        date={new Date(2018, 0, 1)}
        maxDate={new Date(2018, 0, 1)}
      />
    );

    expect(component.find('span').prop('disabled')).toBeFalsy();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = jest.fn();

    const component = mount(
      <Month
        {...tileProps}
        date={date}
        onClick={onClick}
      />
    );

    component.find('span').simulate('click');

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(
      <Month
        {...tileProps}
        date={date}
        onMouseOver={onMouseOver}
      />
    );

    component.find('span').simulate('mouseOver');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const component = mount(
      <Month
        {...tileProps}
        tileContent={<div className="testContent" />}
      />
    );

    const testContent = component.find('.testContent');

    expect(testContent).toHaveLength(1);
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = jest.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const component = mount(
      <Month
        {...tileProps}
        date={date}
        tileContent={tileContent}
      />
    );

    const testContent = component.find('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({ date, view: 'year' });
    expect(testContent).toHaveLength(1);
  });
});
