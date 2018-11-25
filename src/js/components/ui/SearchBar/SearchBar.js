import React from 'react';

import { FormGroup, Label, Input } from 'reactstrap';

type Props = {
  inputStyle?: Object,
  labelStyle?: Object,
  wrapperStyle?: Object,
  placeholder?: string,
  onChange?: () => void,
}
 type State = {
   value: string,
 }

class SearchBar extends React.Component<Props, State> {
  static defaultProps = {
    inputStyle: {},
    labelStyle: {},
    wrapperStyle: {},
    placeholder: 'Search...',
    onChange: () => {},
  }

  state: State = {
    value: '',
  }

  props: Props;

  render() {
    const {
      inputStyle,
      labelStyle,
      wrapperStyle,
      placeholder,
    } = this.props;
    return (
        <FormGroup className="mb-0" style={wrapperStyle}>
            <Label className="d-none" for="search" style={labelStyle}>Search</Label>
            <Input
              className="rounded-0 px-3 py-1 border-0"
              style={inputStyle}
              type="search"
              name="search"
              id="search"
              onChange={this.handleChange}
              value={this.state.value}
              placeholder={placeholder}
            />
        </FormGroup>
    );
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }, this.props.onChange(this.state));
  };
}

export default SearchBar;
