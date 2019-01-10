import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
} from 'reactstrap';

type Props = {
    header?: () => void,
    body?: () => void,
    footer?: () => void,
};

type State = {
    isOpen: Boolean,
};

export default class CustomModal extends Component<Props, State> {
    state = {
        isOpen: false,
    };

    static defaultProps = {
        header: () => {},
        body: () => {},
        footer: () => {},
    }

    render = () => {
        const { isOpen } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={this.toggle}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Modal>
        );
    }

    renderHeader = () => {
        const { header } = this.props;
        return (
            <ModalHeader toggle={this.toggle}>
                {typeof header === 'string' ? header : header()}
            </ModalHeader>
        );
    }

    renderBody = () => {
        const { body } = this.props;
        return <ModalBody>{body()}</ModalBody>;
    }

    renderFooter = () => {
        const { footer } = this.props;
        if (typeof footer === 'function') {
            return <ModalFooter>{footer()}</ModalFooter>;
        } else if (Array.isArray(footer)) {
            return (
                <ModalFooter>
                    {footer.map((action) => {
                        if (action.hidden) return null;
                        return (
                            <Button
                                outline
                                color={action.color}
                                key={action.key}
                                onClick={action.onClick}
                                disabled={action.disabled}
                                type={action.type}
                                form={action.form}
                                className="mr-1"
                            >
                                {action.label}
                            </Button>
                        );
                    })}
                </ModalFooter>
            );
        } else {
            return null;
        }
    }

    toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
}
