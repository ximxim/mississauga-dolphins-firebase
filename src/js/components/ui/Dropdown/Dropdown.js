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
    key?: string,
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
      const { label } = this.props;
      if (!label) return this.renderDropdown();
      return (
          <div className="py-1 px-3">
              <h6 className="d-inline mr-2">{`${label}:`}</h6>
              {this.renderDropdown()}
          </div>
      );
    }

    renderDropdown = () => (
        <ButtonDropdown
          isOpen={this.state.isOpen}
          toggle={this.toggleDropdown}
        >
            <DropdownToggle
              className="bg-transparent text-dark border-0 d-inline m-0 py-0 px-1"
              caret
            >
                {this.state.selectedValue}
            </DropdownToggle>
            <DropdownMenu>
                {this.renderOptions()}
            </DropdownMenu>
        </ButtonDropdown>
    )

    renderOptions = () => _.map(this.props.options, (option, index) => (
        <DropdownItem
          header={option.header}
          disabled={option.disabled}
          key={index}
          onClick={() => this.handleItemClick(option.key ? option.key : option.value)}
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
