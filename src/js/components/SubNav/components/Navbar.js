/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { NavBar, NavBarButton, ToggleButton } from './Navbar.styled';

type Props = {
  toggleSidebar: () => void,
}

type State = {}

class MainNav extends React.Component<Props, *> {
  state: State = {}

  props: Props;

  render() {
    return (
        <NavBar className="bg-white shadow px-3 py-2">
            <div>
                <ToggleButton
                  aria-label="Toggle Sidebar"
                  className="mr-2"
                  onClick={this.props.toggleSidebar}
                >
                    <FontAwesomeIcon icon="align-justify" />
                </ToggleButton>
            </div>
            <div>
                {this.renderNavbarOptions()}
            </div>
        </NavBar>
    );
  }

  renderNavbarOptions = () => [];

  renderNavbarButton = ({
    title, toggle, icon, isOpen, body, hidden,
  }) => hidden || (
      <span>
          <NavBarButton
            aria-label={title}
            className="mx-1"
            id={`${title}Popover`}
            onClick={toggle}
            key={title}
          >
              <FontAwesomeIcon icon={icon} />
          </NavBarButton>
          <Popover
            placement="bottom"
            isOpen={isOpen}
            target={`${title}Popover`}
            toggle={toggle}
          >
              <PopoverHeader>{title}</PopoverHeader>
              <PopoverBody>{body}</PopoverBody>
          </Popover>
      </span>
  )

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
