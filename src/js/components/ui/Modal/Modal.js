import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

type Props = {
    header: () => void,
    body: () => void,
    footer: () => void,
};

type State = {
    isOpen: Boolean,
};

export default class CustomModal extends Component<Props, State> {
    state = {
        isOpen: false,
    };

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
        return <ModalHeader toggle={this.toggle}>{header()}</ModalHeader>;
    }

    renderBody = () => {
        const { body } = this.props;
        return <ModalBody>{body()}</ModalBody>;
    }

    renderFooter = () => {
        const { footer } = this.props;
        return <ModalFooter>{footer()}</ModalFooter>;
    }

    toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
}
