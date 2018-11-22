/* @flow */
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Sidebar, SidebarContent, Wrapper, NavBar, BrandLogo, BrandLogoWrapper, SidebarListItem, Divider,
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
              <Sidebar isOpen={this.state.isOpen} className="bg-primary">
                  <BrandLogoWrapper className="pt-3 pb-2 mb-2 bg-dark">
                      <BrandLogo src="/img/logo.png" className="p-2" />
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
                          <NavBar className="bg-primary">
                              <p>something</p>
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
