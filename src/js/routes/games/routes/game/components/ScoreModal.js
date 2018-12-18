import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

type Props = {
    visible: Boolean,
    toggle: () => void,
    header: () => void,
    body: () => void,
    footer: () => void,
};

type State = {};

export default class ScoreModal extends Component<Props, State> {
    render = () => {
        const { visible, toggle } = this.props;
        return (
            <Modal isOpen={visible} toggle={toggle}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Modal>
        );
    }

    renderHeader = () => {
        const { header, toggle } = this.props;
        return <ModalHeader toggle={toggle}>{header()}</ModalHeader>;
    }

    renderBody = () => {
        const { body } = this.props;
        return <ModalBody>{body()}</ModalBody>;
    }

    renderFooter = () => {
        const { footer } = this.props;
        return <ModalFooter>{footer()}</ModalFooter>;
    }
}
