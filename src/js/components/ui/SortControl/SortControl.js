import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown } from '..';

type State = {
  ascending: Boolean,
}

class SortControl extends React.Component<*, State> {
  state: State = {
    ascending: true,
  }

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
      <Dropdown options={[
        { value: 'Title' },
        { value: 'Startdate' },
      ]}
      />
  )

  toggleDirection = () => this.setState(state => ({ ascending: !state.ascending }));
}

export default SortControl;
