import React, { Component } from 'react';
import classnames from 'classnames';

type Props ={
    children: Object,
};

type State = {
    show: Boolean,
}

export default class LongTextCollapser extends Component<Props, State> {
    state = {
        show: false,
    };

    render() {
        const { show } = this.state;
        const { children } = this.props;
        const className = classnames({ 'text-cutoff': !show });

        return (
            <div className={className} onClick={this.toggle}>
                {children}
            </div>
        );
    }

    toggle = () => this.setState(state => ({ show: !state.show }));
}
