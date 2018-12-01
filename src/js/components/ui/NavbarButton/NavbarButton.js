import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubNavBarButton, SubNavbarLabel } from '../../SubNavbar/SubNavbar.styled';

type Props = {
	icon: string,
	label: string,
};

export default class NavbarButton extends React.Component<Props, *> {
  render() {
	  const { icon, label } = this.props;
	  return (
    <SubNavBarButton>
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
        {label ? <SubNavbarLabel>{label}</SubNavbarLabel> : null}
    </SubNavBarButton>
    );
  }
}
