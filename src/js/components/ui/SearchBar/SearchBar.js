import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  inputStyle?: Object,
  labelStyle?: Object,
  wrapperStyle?: Object,
  placeholder?: string,
  value: string,
  onChange?: () => void,
}
class SearchBar extends React.Component<Props, *> {
  static defaultProps = {
      inputStyle: {},
      labelStyle: {},
      wrapperStyle: {},
      placeholder: 'Search...',
      onChange: () => {},
  }

  props: Props;

  render() {
      const {
          inputStyle,
          labelStyle,
          wrapperStyle,
          placeholder,
          onChange,
          value,
      } = this.props;
      return (
          <FormGroup className="mb-0" style={wrapperStyle}>
              <Label className="d-none" for="search" style={labelStyle}>Search</Label>
              <Input
                  className="rounded-0 px-3 py-1 border-0 form-control-sm my-0"
                  style={inputStyle}
                  type="search"
                  name="search"
                  id="search"
                  onChange={e => onChange(e.target.value)}
                  value={value}
                  placeholder={placeholder}
              />
              <a
                  onClick={() => onChange('')}
                  className="close-button"
                  style={{ top: 5, right: 5 }}
              >
                  <FontAwesomeIcon icon="window-close" />
              </a>
          </FormGroup>
      );
  }
}

export default SearchBar;
