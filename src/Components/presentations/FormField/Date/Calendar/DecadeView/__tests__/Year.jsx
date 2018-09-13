import React from 'react';
import { mount } from 'enzyme';

import Year from '../Year';

/* eslint-disable comma-dangle, jsx-a11y/mouse-events-have-key-events */

const tileProps = {
  date: new Date(2018, 0, 1),
  point: 2018,
};

describe('Year', () => {
  it('renders time component with proper dateTime arguments', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        year={2018}
      />
    );

    const time = component.find('time');

    expect(time).toHaveLength(1);
    expect(time.prop('dateTime')).toBe('2018T00:00:00.000');
    expect(time.text()).toBe('2018');
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = jest.fn();

    const component = mount(
      <Year
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
      <Year
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
      <Year
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
      <Year
        {...tileProps}
        date={date}
        tileContent={tileContent}
      />
    );

    const testContent = component.find('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({ date, view: 'decade' });
    expect(testContent).toHaveLength(1);
  });
});
