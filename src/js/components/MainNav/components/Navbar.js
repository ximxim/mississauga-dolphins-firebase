/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  NavBar, NavBarButton, ToggleButton, Brand,
} from './Navbar.styled';

type Props = {
    toggleSidebar: () => void;
}

class MainNav extends React.Component<Props, *> {
    props: Props;

    render() {
      return (
          <NavBar className="bg-primary px-3 py-2">
              <div>
                  <ToggleButton
                    aria-label="Toggle Sidebar"
                    className="mr-2"
                    onClick={this.props.toggleSidebar}
                  >
                      <FontAwesomeIcon icon="align-justify" />
                  </ToggleButton>
                  <Brand
                    href="index.html"
                    className="navbar-brand brand"
                  >
                    Mississauga Dolphins
                  </Brand>
              </div>
              <div>
                  <NavBarButton aria-label="Notifications" className="mx-1">
                      <FontAwesomeIcon icon="bell" />
                  </NavBarButton>
                  <NavBarButton aria-label="Information" className="mx-1">
                      <FontAwesomeIcon icon="info" />
                  </NavBarButton>
                  <NavBarButton aria-label="User Information" className="mx-1">
                      <FontAwesomeIcon icon="user" />
                  </NavBarButton>
              </div>
          </NavBar>
      );
    }
}

export default MainNav;
