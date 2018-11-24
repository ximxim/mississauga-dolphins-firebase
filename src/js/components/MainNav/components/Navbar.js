/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Popover, PopoverHeader, PopoverBody,
} from 'reactstrap';

import {
  MainNavBar, MainNavBarButton, MainToggleButton, Brand,
} from './Navbar.styled';
import { Navbar } from '../../../redux/modules/Meta/types';

type Props = {
  toggleSidebar: () => void,
  featureFlags: Navbar,
}

type State = {
  notificationPopoverVisibility: Boolean,
  informationPopoverVisibility: Boolean,
  userPopoverVisilibity: Boolean,
}

class MainNavbar extends React.Component<Props, *> {
  state: State = {
    notificationPopoverVisibility: false,
    informationPopoverVisibility: false,
    userPopoverVisilibity: false,
  }

  props: Props;

  render() {
    return (
        <MainNavBar className="bg-primary px-3 py-2">
            <div>
                <MainToggleButton
                  aria-label="Toggle Sidebar"
                  className="mr-2"
                  onClick={this.props.toggleSidebar}
                >
                    <FontAwesomeIcon icon="align-justify" />
                </MainToggleButton>
                <Brand
                  href="index.html"
                  className="navbar-brand brand"
                >
                  Mississauga Dolphins
                </Brand>
            </div>
            <div>
                {this.renderNavbarOptions()}
            </div>
        </MainNavBar>
    );
  }

  renderNavbarOptions = () => [
    this.renderNavbarButton({
      title: 'Notifications',
      toggle: this.toggleNotificationPopover,
      icon: 'bell',
      isOpen: this.state.notificationPopoverVisibility,
      body: 'Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.',
      hidden: !this.props.featureFlags.notifications,
    }),
    this.renderNavbarButton({
      title: 'Information',
      toggle: this.toggleInformationPopover,
      icon: 'info',
      isOpen: this.state.informationPopoverVisibility,
      body: 'Information is better than nothing',
      hidden: !this.props.featureFlags.information,
    }),
    this.renderNavbarButton({
      title: 'User',
      toggle: this.toggleUserPopover,
      icon: 'user',
      isOpen: this.state.userPopoverVisilibity,
      body: 'User is better than nothing',
      hidden: !this.props.featureFlags.user,
    }),
  ];

  renderNavbarButton = ({
    title, toggle, icon, isOpen, body, hidden,
  }) => hidden || (
      <span>
          <MainNavBarButton
            aria-label={title}
            className="mx-1"
            id={`${title}Popover`}
            onClick={toggle}
            key={title}
          >
              <FontAwesomeIcon icon={icon} />
          </MainNavBarButton>
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

export default MainNavbar;
