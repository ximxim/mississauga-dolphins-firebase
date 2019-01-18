/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    MainSidebarStyled,
    BrandLogo,
    BrandLogoWrapper,
    MainSidebarListItem,
    Divider,
    MainToggleButton,
} from './MainSidebar.styled';
import { Sidebar as SidebarTypes } from '../../../redux/modules/Meta/types';
import { update } from '../../../redux/modules/ClubInformation';
import { ClubInformation } from '../../../redux/modules/ClubInformation/types';
import { Modal } from '../../ui';
import { ClubInformationForm } from '../../forms';

type Props = {
    clubInformation: ClubInformation,
    isOpen: Boolean,
    toggleSidebar: () => void,
    featureFlags: SidebarTypes,
    signOut: () => void,
    update: () => void,
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
                <Modal
                    header="Club Information"
                    body={this.renderClubInfoBody}
                    footer={this.clubInformationOptions()}
                    ref={(o) => { this.clubInformationModal = o; }}
                />
            </MainSidebarStyled>
        );
    }

    renderClubInfoBody = () => (
        <ClubInformationForm
            action={this.props.update}
            information={this.props.clubInformation.information}
        />
    );

    clubInformationOptions = () => [
        {
            label: 'Cancel',
            key: 'cancel',
            color: 'secondary',
            onClick: () => this.clubInformationModal
            && this.clubInformationModal.toggle(),
        },
        {
            label: 'Save',
            key: 'save',
            color: 'primary',
            form: 'club-information',
            type: 'submit',
        },
    ];

    renderSidebarOptions = () => [
        this.renderListItem({
            icon: 'newspaper',
            title: 'News feed',
            hidden: !this.props.featureFlags.newsfeed,
            key: 'newsfeed',
            route: '/newsfeed',
        }),
        this.renderListItem({
            icon: 'headset',
            title: 'Games',
            hidden: !this.props.featureFlags.games,
            key: 'games',
            route: '/games/menu',
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
            route: '/sponsors',
        }),
        <Divider key="divider1" />,
        this.renderListItem({
            icon: 'info-circle',
            title: 'Club Info',
            key: 'club-info',
            onClick: () => this.clubInformationModal
            && this.clubInformationModal.toggle(),
        }),
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
        let comp;
        if (route) {
            comp = (
                <Link to={route} onClick={onClick}>
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                    <span>{title}</span>
                </Link>
            );
        } else {
            comp = (
                <a onClick={onClick}>
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                    <span>{title}</span>
                </a>
            );
        }
        return (
            <MainSidebarListItem className="p-3" key={key}>
                {comp}
            </MainSidebarListItem>
        );
    }
}

const mapStateToProps = state => ({
    clubInformation: state.clubInformation,
});

const mapDispatchToProps = {
    update,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebar);
