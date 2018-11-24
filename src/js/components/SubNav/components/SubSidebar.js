/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubSidebarStyled, SubToggleButton } from './SubSidebar.styled';

type Props = {
    children: Object,
    isOpen: Boolean,
    toggleSidebar: () => void,
};

type State = {};

class SubSidebar extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <SubSidebarStyled isOpen={this.props.isOpen} className="shadow">
              <div className="bg-dark px-2 pt-2">
                  <SubToggleButton aria-label="Toggle Sidebar" onClick={this.props.toggleSidebar}>
                      <FontAwesomeIcon icon="window-close" />
                  </SubToggleButton>
              </div>
              {this.props.children}
          </SubSidebarStyled>
      );
    }
}

export default SubSidebar;
