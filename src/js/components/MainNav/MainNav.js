/* @flow */
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Sidebar, SidebarContent, Wrapper, NavBar, BrandLogo, BrandLogoWrapper, SidebarListItem, Divider, NavBarButton,
} from './components';

type Props = {
    children: Object,
};

type State = {
    isOpen: Boolean,
};

class MainNav extends React.Component<Props, State> {
    state: State = {
      isOpen: false,
    }

    props: Props;

    render() {
      return (
          <Wrapper>
              <Sidebar isOpen={this.state.isOpen} className="bg-primary shadow">
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
              <SidebarContent>
                  <div className="row no-gutters">
                      <div className="col">
                          <NavBar className="bg-primary px-3 py-2">
                              <a
                                href="index.html"
                                className="navbar-brand brand"
                              >
                              Mississauga Dolphins
                              </a>
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
                      </div>
                  </div>
                  {this.props.children}
              </SidebarContent>
          </Wrapper>
      );
    }
}

export default MainNav;
