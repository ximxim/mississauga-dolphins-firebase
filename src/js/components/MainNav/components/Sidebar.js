/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Sidebar, BrandLogo, BrandLogoWrapper, SidebarListItem, Divider, ToggleButton,
} from './Sidebar.styled';
import { Sidebar as SidebarTypes } from '../../../redux/modules/Meta/types';

type Props = {
    isOpen: Boolean,
    toggleSidebar: () => void,
    featureFlags: SidebarTypes,
};

type State = {};

class MainNav extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <Sidebar isOpen={this.props.isOpen} className="bg-primary shadow">
              <div className="bg-dark px-2 pt-2">
                  <ToggleButton aria-label="Toggle Sidebar" onClick={this.props.toggleSidebar}>
                      <FontAwesomeIcon icon="window-close" />
                  </ToggleButton>
              </div>
              <BrandLogoWrapper className="pt-3 pb-2 mb-2 bg-dark">

                  <BrandLogo src="/img/logo.png" className="p-2" alt="Mississauga Dolphins Logo" />
              </BrandLogoWrapper>
              <ul className="list-unstyled">
                  {this.renderSidebarOptions()}
              </ul>
          </Sidebar>
      );
    }

    renderSidebarOptions = () => [
      this.renderListItem({
        icon: 'newspaper',
        title: 'News feed',
        hidden: !this.props.featureFlags.newsfeed,
      }),
      this.renderListItem({
        icon: 'headset',
        title: 'Games',
        hidden: !this.props.featureFlags.games,
      }),
      this.renderListItem({
        icon: 'users',
        title: 'Players',
        hidden: !this.props.featureFlags.players,
      }),
      this.renderListItem({
        icon: 'life-ring',
        title: 'Sponsors',
        hidden: !this.props.featureFlags.sponsors,
      }),
        <Divider />,
        this.renderListItem({
          icon: 'cogs',
          title: 'Settings',
          hidden: !this.props.featureFlags.settings,
        }),
        <Divider />,
        this.renderListItem({
          icon: 'user',
          title: 'Sign out',
        }),
    ];

    renderListItem = ({ icon, title, hidden }) => {
      if (hidden) return null;
      return (
          <SidebarListItem className="p-3" key={title}>
              <a href="#">
                  <FontAwesomeIcon icon={icon} className="mr-2" />
                  <span>{title}</span>
              </a>
          </SidebarListItem>
      );
    }
}

export default MainNav;
