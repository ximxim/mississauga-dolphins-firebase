import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { SubNavbar } from '../../../../../components';
import { NavbarButton } from '../../../../../components/ui';

type Props = {
    options: Array<Object>,
};

export default class Navbar extends Component<Props, *> {
    render = () => (
        <SubNavbar>
            {this.props.options.map((option) => {
                if (option.hidden) return null;
                return (
                    <NavbarButton
                        icon={option.icon}
                        label={option.label}
                        key={option.key}
                        onClick={option.onClick}
                    />
                );
            })}
        </SubNavbar>
    )
}
