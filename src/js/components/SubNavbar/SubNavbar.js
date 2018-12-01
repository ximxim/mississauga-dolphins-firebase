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

type Props = {
	children: Object,
}

type State = {
	isOpen: Boolean,
}

class SubNavbar extends React.Component<Props, *> {
  state: State = {
	  isOpen: false,
  }

  props: Props;

  render() {
    return (
        <Navbar color="light" light expand="md">
            {this.toggleSidebar()}
            {this.navbarToggler()}
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {this.props.children}
                </Nav>
            </Collapse>
        </Navbar>
    );
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
