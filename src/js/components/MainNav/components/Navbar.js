/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Popover, PopoverHeader, PopoverBody,
} from 'reactstrap';

import {
  NavBar, NavBarButton, ToggleButton, Brand,
} from './Navbar.styled';

type Props = {
    toggleSidebar: () => void;
}

type State = {
    notificationPopoverVisibility: Boolean,
    informationPopoverVisibility: Boolean,
    userPopoverVisilibity: Boolean,
}

class MainNav extends React.Component<Props, *> {
    state: State = {
      notificationPopoverVisibility: false,
      informationPopoverVisibility: false,
      userPopoverVisilibity: false,
    }

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
                  <NavBarButton
                    aria-label="Notifications"
                    className="mx-1"
                    id="notificationPopover"
                    onClick={this.toggleNotificationPopover}
                  >
                      <FontAwesomeIcon icon="bell" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.notificationPopoverVisibility}
                    target="notificationPopover"
                    toggle={this.toggleNotificationPopover}
                  >
                      <PopoverHeader>Notifications</PopoverHeader>
                      <PopoverBody>
                            Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                      </PopoverBody>
                  </Popover>
                  <NavBarButton
                    aria-label="Information"
                    className="mx-1"
                    id="informationPopover"
                    onClick={this.toggleInformationPopover}
                  >
                      <FontAwesomeIcon icon="info" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.informationPopoverVisibility}
                    target="informationPopover"
                    toggle={this.toggleInformationPopover}
                  >
                      <PopoverHeader>Information</PopoverHeader>
                      <PopoverBody>
                            Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                      </PopoverBody>
                  </Popover>
                  <NavBarButton
                    aria-label="User Information"
                    className="mx-1"
                    id="userPopover"
                    onClick={this.toggleUserPopover}
                  >
                      <FontAwesomeIcon icon="user" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.userPopoverVisilibity}
                    target="userPopover"
                    toggle={this.toggleUserPopover}
                  >
                      <PopoverHeader>User</PopoverHeader>
                      <PopoverBody>
                            Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                      </PopoverBody>
                  </Popover>
              </div>
          </NavBar>
      );
    }

    toggleNotificationPopover = () => {
      this.setState(state => ({
        notificationPopoverVisibility: !state.notificationPopoverVisibility,
      }));
    };

    toggleInformationPopover = () => {
      this.setState(state => ({
        informationPopoverVisibility: !state.informationPopoverVisibility,
      }));
    };

    toggleUserPopover = () => {
      this.setState(state => ({
        userPopoverVisilibity: !state.userPopoverVisilibity,
      }));
    };
}

export default MainNav;
