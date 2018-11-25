import React from 'react';

import { FormGroup, Label, Input } from 'reactstrap';

type Props = {
  inputStyle?: Object,
  labelStyle?: Object,
  wrapperStyle?: Object,
  placeholder?: string,
}

class SearchBar extends React.Component<Props, *> {
  static defaultProps = {
    inputStyle: {},
    labelStyle: {},
    wrapperStyle: {},
    placeholder: 'Search...',
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
              placeholder={placeholder}
            />
        </FormGroup>
    );
  }
}

export default SearchBar;
