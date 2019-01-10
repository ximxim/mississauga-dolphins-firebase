import React, { Component } from 'react';

import { SubNavbar } from '../../../components';
import { NavbarButton } from '../../../components/ui';

type Props = {
    options?: Array<Object>,
};

export default class Navbar extends Component<Props, *> {
    static defaultProps = {
        options: [],
    }

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
