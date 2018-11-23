/* @flow */
import React from 'react';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import { SidebarContent, Wrapper } from './MainNav.styled';

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
              <Sidebar isOpen={this.state.isOpen} toggleSidebar={this.toggleSidebar} />
              <SidebarContent>
                  <div className="row no-gutters">
                      <div className="col">
                          <Navbar toggleSidebar={this.toggleSidebar} />
                      </div>
                  </div>
                  {this.props.children}
              </SidebarContent>
          </Wrapper>
      );
    }

    toggleSidebar = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

export default MainNav;
