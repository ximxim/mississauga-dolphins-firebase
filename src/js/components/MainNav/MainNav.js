/* @flow */
import React from 'react';

import { Sidebar, SidebarContent, Wrapper } from './components';

type Props = {
    children: Object,
};

class MainNav extends React.Component<Props, *> {
    props: Props;

    render() {
      return (
          <Wrapper>
              <Sidebar>
                  <div><p>something else</p></div>
              </Sidebar>
              <SidebarContent>
                  {this.props.children}
              </SidebarContent>
          </Wrapper>
      );
    }
}

export default MainNav;
