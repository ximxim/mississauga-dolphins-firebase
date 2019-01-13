/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Navbar,
    Collapse,
    Nav,
} from 'reactstrap';

import { ToggleConsumer } from '../SubNav/SubNav';
import { SubToggleButton, SubToggleLabel } from './SubNavbar.styled';
import { NavbarButton } from '../ui';

type Props = {
    children: Object,
    options?: Array<Object>,
}

type State = {
	isOpen: Boolean,
}

class SubNavbar extends React.Component<Props, State> {
    static defaultProps = {
        options: [],
    }

    state = {
        isOpen: false,
    }

    render() {
        return (
            <Navbar color="light" light expand="md" className="shadow bg-white">
                {this.toggleSidebar()}
                {this.navbarToggler()}
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.renderOptions()}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

  renderOptions = () => {
      const { children, options } = this.props;
      if (children) return children;
      return options.map((option) => {
          if (option.hidden) return null;
          return (
              <NavbarButton
                  icon={option.icon}
                  label={option.label}
                  key={option.key}
                  onClick={option.onClick}
              />
          );
      });
  }

  toggleSidebar = () => (
      <ToggleConsumer>
          {({ toggleSubSidebar }) => (
              <SubToggleButton
                  aria-label="Toggle Sidebar"
                  className="mr-2"
                  onClick={toggleSubSidebar}
              >
                  <FontAwesomeIcon icon="align-left" />
                  <SubToggleLabel>Menu</SubToggleLabel>
              </SubToggleButton>
          )}
      </ToggleConsumer>
  );

  navbarToggler = () => (
      <SubToggleButton
          aria-label="Toggle Sidebar"
          className="mr-2"
          onClick={this.toggleNavbar}
      >
          <SubToggleLabel>Option</SubToggleLabel>
          <FontAwesomeIcon icon="align-right" />
      </SubToggleButton>
  );

  toggleNavbar = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

export default SubNavbar;
