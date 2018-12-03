import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubNavBarButton, SubNavbarLabel } from '../../SubNavbar/SubNavbar.styled';

type Props = {
	icon: string,
	label: string,
	onClick: () => void,
};

export default class NavbarButton extends React.Component<Props, *> {
  render() {
	  const { icon, label, onClick } = this.props;
	  return (
    <SubNavBarButton onClick={onClick}>
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
        {label ? <SubNavbarLabel>{label}</SubNavbarLabel> : null}
    </SubNavBarButton>
    );
  }
}
