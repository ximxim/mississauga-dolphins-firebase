import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

type Props = {}

type State = {
	isOpen: Boolean,
}

export default class StartGameModal extends React.Component<Props, State> {
	state = {
	  isOpen: false,
	}

	render() {
	  return (
    <div>
        <Modal
            toggle={this.toggle}
            isOpen={this.state.isOpen}
        >
            <ModalHeader toggle={this.toggle}>
				Start Game
            </ModalHeader>
            <ModalBody />
            <ModalFooter />
        </Modal>
    </div>
	  );
	}

	toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
}
