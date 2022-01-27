import React, { Component, KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

interface State {
  readonly inputValue: string;
  readonly value: readonly Option[];
  readonly setNotesValue: Function;
}
type Props = {
  setNotesValue: Function;
};

export default class CreatableInputOnly extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      setNotesValue: props.setNotesValue,
      inputValue: '',
      value: [],
    };
  }

  handleChange = (
    value: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };
  handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };

  render() {
    const { inputValue, value } = this.state;
    this.state.setNotesValue(value);

    return (
      <CreatableSelect
        className="menorship-mentor-model"
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Add some notes..."
        value={value}
      />
    );
  }
}
