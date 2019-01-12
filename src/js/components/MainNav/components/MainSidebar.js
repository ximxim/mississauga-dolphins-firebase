/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import {
    MainSidebarStyled,
    BrandLogo,
    BrandLogoWrapper,
    MainSidebarListItem,
    Divider,
    MainToggleButton,
} from './MainSidebar.styled';
import { Sidebar as SidebarTypes } from '../../../redux/modules/Meta/types';

type Props = {
    isOpen: Boolean,
    toggleSidebar: () => void,
    featureFlags: SidebarTypes,
    signOut: () => void,
};

type State = {};

class MainSidebar extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
        return (
            <MainSidebarStyled isOpen={this.props.isOpen} className="bg-primary shadow">
                <div className="bg-dark px-2 pt-2">
                    <MainToggleButton aria-label="Toggle Sidebar" onClick={this.props.toggleSidebar}>
                        <FontAwesomeIcon icon="window-close" />
                    </MainToggleButton>
                </div>
                <BrandLogoWrapper className="pt-3 pb-2 mb-2 bg-dark">

                    <BrandLogo src="/img/logo.png" className="p-2" alt="Mississauga Dolphins Logo" />
                </BrandLogoWrapper>
                <ul className="list-unstyled">
                    {this.renderSidebarOptions()}
                </ul>
            </MainSidebarStyled>
        );
    }

    renderSidebarOptions = () => [
        this.renderListItem({
            icon: 'newspaper',
            title: 'News feed',
            hidden: !this.props.featureFlags.newsfeed,
            key: 'newsfeed',
        }),
        this.renderListItem({
            icon: 'headset',
            title: 'Games',
            hidden: !this.props.featureFlags.games,
            key: 'games',
        }),
        this.renderListItem({
            icon: 'users',
            title: 'Players',
            hidden: !this.props.featureFlags.players,
            key: 'players',
            route: '/players/menu',
        }),
        this.renderListItem({
            icon: 'life-ring',
            title: 'Sponsors',
            hidden: !this.props.featureFlags.sponsors,
            key: 'sponsors',
        }),
        <Divider key="divider1" />,
        this.renderListItem({
            icon: 'cogs',
            title: 'Settings',
            hidden: !this.props.featureFlags.settings,
            key: 'settings',
        }),
        <Divider key="divider2" />,
        this.renderListItem({
            icon: 'user',
            title: 'Sign out',
            onClick: this.props.signOut,
            key: 'signout',
        }),
    ];

    renderListItem = ({
        icon, title, hidden, onClick, key, route,
    }) => {
        if (hidden) return null;
        return (
            <MainSidebarListItem className="p-3" key={key}>
                <Link to={route || '/'} onClick={onClick}>
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                    <span>{title}</span>
                </Link>
            </MainSidebarListItem>
        );
    }
}

export default MainSidebar;
