/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Sidebar, BrandLogo, BrandLogoWrapper, SidebarListItem, Divider, ToggleButton,
} from './Sidebar.styled';

type Props = {
    isOpen: Boolean,
    toggleSidebar: () => void;
};

type State = {};

class MainNav extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <Sidebar isOpen={this.props.isOpen} className="bg-primary shadow">
              <div className="bg-dark px-2 pt-2">
                  <ToggleButton aria-label="Toggle Sidebar" onClick={this.props.toggleSidebar}>
                      <FontAwesomeIcon icon="window-close" />
                  </ToggleButton>
              </div>
              <BrandLogoWrapper className="pt-3 pb-2 mb-2 bg-dark">

                  <BrandLogo src="/img/logo.png" className="p-2" alt="Mississauga Dolphins Logo" />
              </BrandLogoWrapper>
              <ul className="list-unstyled">
                  <SidebarListItem className="p-3">
                      <a href="#" className="text-white">
                          <FontAwesomeIcon icon="newspaper" className="mr-2" />
                          <span>NewsFeed</span>
                      </a>
                  </SidebarListItem>
                  <SidebarListItem className="p-3">
                      <a href="#" className="text-white">
                          <FontAwesomeIcon icon="headset" className="mr-2" />
                          <span>Games</span>
                      </a>
                  </SidebarListItem>
                  <SidebarListItem className="p-3">
                      <a href="#" className="text-white">
                          <FontAwesomeIcon icon="users" className="mr-2" />
                          <span>Players</span>
                      </a>
                  </SidebarListItem>
                  <SidebarListItem className="p-3">
                      <a href="#" className="text-white">
                          <FontAwesomeIcon icon="life-ring" className="mr-2" />
                          <span>Sponsors</span>
                      </a>
                  </SidebarListItem>
                  <Divider />
                  <SidebarListItem className="p-3">
                      <a href="#" className="text-white">
                          <FontAwesomeIcon icon="cogs" className="mr-2" />
                          <span>Settings</span>
                      </a>
                  </SidebarListItem>
              </ul>
          </Sidebar>
      );
    }
}

export default MainNav;
