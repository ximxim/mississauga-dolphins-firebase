import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import _ from 'lodash';

type Option = {
    value: string,
    disabled?: Boolean,
    header?: Boolean,
}

type Props = {
    onChange?: () => void,
    options: Array<Option>,
    label: string,
};

type State = {
    isOpen: Boolean,
}

class Dropdown extends React.Component<Props, State> {
    static defaultProps = {
      onChange: () => {},
    }

    state: State = {
      isOpen: false,
      selectedValue: this.props.options ? this.props.options[0].value : 'Select',
    }

    props: Props;

    render() {
      return (
          <div>
              <h6 className="d-inline">{this.props.label}</h6>
              <ButtonDropdown
                isOpen={this.state.isOpen}
                toggle={this.toggleDropdown}
              >
                  <DropdownToggle
                    className="bg-transparent text-dark border-0 d-inline"
                    caret
                  >
                      {this.state.selectedValue}
                  </DropdownToggle>
                  <DropdownMenu>
                      {this.renderOptions()}
                  </DropdownMenu>
              </ButtonDropdown>
          </div>

      );
    }

    renderOptions = () => _.map(this.props.options, (option, index) => (
        <DropdownItem
          header={option.header}
          disabled={option.disabled}
          key={index}
          onClick={() => this.handleItemClick(option.value)}
        >
            {option.value}
        </DropdownItem>
    ))

    handleItemClick = (selectedValue) => {
      this.setState({ selectedValue }, () => this.props.onChange(this.state));
    }

    toggleDropdown = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

export default Dropdown;
