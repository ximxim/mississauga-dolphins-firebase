/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import SubSidebar from './components/SubSidebar';
import SubNavbar from './components/SubNavbar';


import { SubSidebarContent, SubWrapper } from './SubNav.styled';
import { Admin } from '../../redux/modules/Meta/types';

type Props = {
    children: Object,
    admin: Admin,
    renderSidebarContent: () => void,
};

type State = {
    isOpen: Boolean,
};

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
                featureFlags={this.props.admin.Sidebar}
              >
                  {this.props.renderSidebarContent()}
              </SubSidebar>
              <SubSidebarContent>
                  <div className="row no-gutters">
                      <div className="col">
                          <SubNavbar
                            toggleSidebar={this.toggleSidebar}
                            featureFlags={this.props.admin.Navbar}
                          />
                      </div>
                  </div>
                  <div className="px-2">
                      {this.props.children}
                  </div>
              </SubSidebarContent>
          </SubWrapper>
      );
    }

    toggleSidebar = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

const mapStateToProps = state => ({
  admin: state.meta.Admin,
});

export default connect(mapStateToProps)(SubNav);
