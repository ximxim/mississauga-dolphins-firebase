import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addGameEvent } from '../../../../redux/modules/Events';
import { Modal } from '../../../../components/ui';
import { GameEventForm } from '../../../../components/forms';
import Navbar from '../../components/Navbar';
import { MenuImage } from './GamesMenu.styled';

type Props = {
    addGameEvent: () => void,
};

type State = {};

class GamesMenu extends Component<Props, State> {
    render() {
        return (
            <div>
                <Navbar options={this.NavbarOptions()} />
                <div className="m-2">
                    <h3 className="text-center">Games Menu</h3>
                    <p className="text-center">
                        Select a game from the menu or create a new game by clicking on 'Create Game' button above
                    </p>
                    <MenuImage src="/img/games-menu.jpg" alt="Games Menu Image" className="shadow" />
                    <Modal
                        header="Create Game"
                        body={() => this.renderScoreModalBody()}
                        footer={this.createGameOptions()}
                        ref={(o) => { this.CreateGameModal = o; }}
                    />
                </div>
            </div>
        );
    }

    createGameOptions = () => ([
        {
            label: 'Cancel',
            key: 'cancel',
            color: 'secondary',
            onClick: () => this.CreateGameModal && this.CreateGameModal.toggle(),
        },
        {
            label: 'Submit',
            key: 'submit',
            color: 'primary',
            type: 'submit',
            form: 'game-form',
        },
    ]);

    renderScoreModalBody = () => (
        <GameEventForm action={this.props.addGameEvent} />
    )

    NavbarOptions = () => ([
        {
            icon: 'list-ol',
            label: 'Create Game',
            key: 'createGame',
            onClick: () => this.CreateGameModal && this.CreateGameModal.toggle(),
        },
    ]);
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    addGameEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesMenu);
