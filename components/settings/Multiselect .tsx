import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import {ethnicities} from '../../contexts/utils/fields';
import { ActionMeta, OnChangeValue } from 'react-select';
interface Ethnicity {
    readonly label: string;
    readonly value: string;
  }
  interface Option {
    readonly label: string;
    readonly value: string;
  }
  interface State {
    readonly ethnicity: Option[];
    readonly setNotesValue: Function;
  }
  type Props = {
    setNotesValue: Function;
     ethnicity:  Option[];
  };
export default class CreatableMulti extends Component<Props, State> {
constructor(props: Props) {
    super(props);
    this.state = {
        setNotesValue: props.setNotesValue,
        ethnicity: props.ethnicity,
};
}
  handleChange = (
    newValue: OnChangeValue<Ethnicity, true>,
    actionMeta: ActionMeta<Ethnicity>
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        options={ethnicities}
      />
    );
  }
}