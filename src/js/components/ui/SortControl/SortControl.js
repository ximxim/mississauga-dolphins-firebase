import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import { Dropdown } from '..';

type State = {
  ascending: Boolean,
  option: string,
}

type Props = {
  onChange: () => void,
  options: {
    key: string,
    value: string,
    type: string,
  }
};

class SortControl extends React.Component<Props, State> {
  state: State = {
    ascending: true,
    option: '',
  }

  props: Props;

  render() {
    return (
        <div>
            {this.renderIcon()}
            <p className="d-inline mb-0">sort by</p>
            {this.renderDropdown()}
        </div>
    );
  }

  renderIcon = () => {
    const { ascending } = this.state;
    const icon = ascending ? 'sort-alpha-down' : 'sort-alpha-up';
    return (
        <button
          type="button"
          className="bg-transparent border-0 d-inline"
          onClick={this.toggleDirection}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
  }

  renderDropdown = () => (
      <Dropdown options={this.props.options} onChange={this.handleOptionChange} />
  )

  handleOptionChange = ({ selectedKey }) => this.setState(
    { option: selectedKey },
    this.handleChange,
  );

  toggleDirection = () => this.setState(
    state => ({ ascending: !state.ascending }),
    this.handleChange,
  );

  handleChange = () => this.props.onChange(this.state);
}

export default SortControl;
