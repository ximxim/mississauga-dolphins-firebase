/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import MainSidebar from './components/MainSidebar';
import Navbar from './components/MainNavbar';


import { MainSidebarContent, Wrapper } from './MainNav.styled';
import { Admin } from '../../redux/modules/Meta/types';

type Props = {
    children: Object,
    admin: Admin,
    signOut: () => void,
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
                <MainSidebar
                    isOpen={this.state.isOpen}
                    toggleSidebar={this.toggleSidebar}
                    featureFlags={this.props.admin.Sidebar}
                    signOut={this.props.signOut}
                />
                <div className="row no-gutters w-100">
                    <div className="col">
                        <Navbar
                            toggleSidebar={this.toggleSidebar}
                            featureFlags={this.props.admin.Navbar}
                        />
                        <MainSidebarContent>
                            {this.props.children}
                        </MainSidebarContent>
                    </div>
                </div>
            </Wrapper>
        );
    }

    toggleSidebar = () => this.setState(state => ({ isOpen: !state.isOpen }));
}

const mapStateToProps = state => ({
    admin: state.meta.Admin,
});

export default connect(mapStateToProps)(MainNav);
