import React, { Component } from 'react';
import './css/flex.css';
import FormField from './FormField/FormField.js';
import Toggle from './Toggle/Toggle';

class Controls extends Component {
  render() {
    let items = [
      { value: 1, text: "One" },
      { value: 2, text: "Two" },
      { value: 3, text: "Three" },
      { value: 4, text: "Four" },
      { value: 5, text: "Five" },
      { value: 6, text: "Six" },
      { value: 7, text: "Seven"}
    ];

    return (
      <div className="App">

        <div className='flex wrap'>
          <FormField title="VIN" fieldType="VIN" />
          <FormField title="Text" />
          <FormField title="Disabled Text" isDisabledReadOnly={true} />
          <FormField title="Text with Info Glyph">
              <span>If you want to have an explanation of the field,</span><br/>
              <span>just click the <img src="assets/images/icon-rounded-outline-info.svg" />.</span>
          </FormField>

          <br />
          <FormField title="User Id" fieldType="UserId" />
          <FormField title="Password" fieldType="Password" />
          <FormField title="Email" fieldType="Email" />

          <br />
          <FormField title="Drop Down" fieldType="DropDown" items={items} value={{ value: 7, text: "Seven" }} />
          <FormField title="Date Picker" fieldType="DatePicker" />
          <FormField title="Date Picker (Germany)" fieldType="DatePicker" languageCode="de-DE" />

          <br />
          <FormField title="Currency (USA)" fieldType="Currency" />
          <FormField title="Currency (Germany)" fieldType="Currency" currencyCode="EUR" languageCode="de-DE" />

          <br />
          <FormField title="Number" fieldType="Number" />
          <FormField title="Number (Minimum 0)" fieldType="Number" minValue={0} />
          <FormField title="Formatted Number" fieldType="Number" isFormattedNumber={true} />
          <FormField title="Formatted Number (Germany)" fieldType="Number" isFormattedNumber={true} languageCode="de-DE" />

          <br />
          <Toggle type='Checkbox' label="Checkbox" />
          <Toggle type='Radio' label="Radio" />
          <Toggle type='Button' label="Button Toggle" />
          <Toggle type='Switch' label="Switch" />
        </div>
      </div>
    );
  }
}

export default Controls;
