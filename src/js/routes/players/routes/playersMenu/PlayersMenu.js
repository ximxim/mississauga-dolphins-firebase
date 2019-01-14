import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPlayer } from '../../../../redux/modules/Players';
import { SubNavbar } from '../../../../components';
import { Modal } from '../../../../components/ui';
import { PlayerForm } from '../../../../components/forms';
import { MenuImage } from './PlayersMenu.styled';

type Props = {
    addPlayer: () => void,
};

class PlayersMenu extends Component<Props, *> {
    render() {
        return (
            <div>
                <SubNavbar options={this.NavbarOptions()} />
                <h3 className="text-center">Players Menu</h3>
                <p className="text-center">
                    Select a player from the menu or create a new player by clicking on 'Create Player' button above
                </p>
                <MenuImage src="/img/players-menu.jpg" alt="Players Menu" className="shadow" />
                <Modal
                    header="Create Player"
                    body={() => this.renderCreatePlayerBody()}
                    footer={this.createPlayerOptions()}
                    ref={(o) => { this.CreatePlayerModal = o; }}
                />
            </div>
        );
    }

    renderCreatePlayerBody = () => <PlayerForm action={this.props.addPlayer} />

    createPlayerOptions = () => ([
        {
            label: 'Cancel',
            key: 'cancel',
            color: 'secondary',
            onClick: () => this.CreatePlayerModal && this.CreatePlayerModal.toggle(),
        },
        {
            label: 'Submit',
            key: 'submit',
            color: 'primary',
            type: 'submit',
            form: 'player-form',
        },
    ]);

    NavbarOptions = () => ([
        {
            icon: 'user-add',
            label: 'Create Player',
            key: 'createPlayer',
            onClick: () => this.CreatePlayerModal && this.CreatePlayerModal.toggle(),
        },
    ]);
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    addPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersMenu);
