/* @flow */
import React from 'react';

import SubSidebar from './components/SubSidebar';
import { SubSidebarContent, SubWrapper } from './SubNav.styled';

type Props = {
    children: Object,
    renderSidebarContent: () => void,
};

type State = {
    isOpen: Boolean,
};

const ToggleContext = React.createContext();
export function ToggleConsumer(props) {
  return (
      <ToggleContext.Consumer>
          {context => props.children(context)}
      </ToggleContext.Consumer>
  );
}

class SubNav extends React.Component<Props, State> {
    state: State = {
      isOpen: false,
    }

    props: Props;

    render() {
      return (
          <SubWrapper>
              <SubSidebar
                isOpen={this.state.isOpen}
                toggleSidebar={this.toggleSidebar}
              >
                  {this.props.renderSidebarContent()}
              </SubSidebar>
              <SubSidebarContent>
                  <ToggleContext.Provider
                    value={{ toggleSubSidebar: this.toggleSidebar }}
                  >
                      {this.props.children}
                  </ToggleContext.Provider>
              </SubSidebarContent>
          </SubWrapper>
      );
    }

    toggleSidebar = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

export default SubNav;
