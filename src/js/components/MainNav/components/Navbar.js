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
                    onMouseEnter={() => this.toggleNotificationPopover(true)}
                  >
                      <FontAwesomeIcon icon="bell" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.notificationPopoverVisibility}
                    target="notificationPopover"
                    onMouseLeave={() => this.toggleNotificationPopover(false)}
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
                    onMouseEnter={() => this.toggleInformationPopover(true)}
                  >
                      <FontAwesomeIcon icon="info" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.informationPopoverVisibility}
                    target="informationPopover"
                    onMouseLeave={() => this.toggleInformationPopover(false)}
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
                    onMouseEnter={() => this.toggleUserPopover(true)}
                  >
                      <FontAwesomeIcon icon="user" />
                  </NavBarButton>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.userPopoverVisilibity}
                    target="userPopover"
                    toggle={this.toggleUserPopover}
                    onMouseLeave={() => this.toggleUserPopover(false)}
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

    toggleNotificationPopover = (visibility) => {
      this.setState(state => ({
        informationPopoverVisibility: visibility ? false : state.informationPopoverVisibility,
        userPopoverVisilibity: visibility ? false : state.userPopoverVisilibity,
        notificationPopoverVisibility: visibility,
      }));
    };

    toggleInformationPopover = (visibility) => {
      this.setState(state => ({
        notificationPopoverVisibility: visibility ? false : state.notificationPopoverVisibility,
        userPopoverVisilibity: visibility ? false : state.userPopoverVisilibity,
        informationPopoverVisibility: visibility,
      }));
    };

    toggleUserPopover = (visibility) => {
      this.setState(state => ({
        notificationPopoverVisibility: visibility ? false : state.notificationPopoverVisibility,
        informationPopoverVisibility: visibility ? false : state.informationPopoverVisibility,
        userPopoverVisilibity: visibility,
      }));
    };
}

export default MainNav;
