import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

type Props = {};

type State = {};

class GamesMenu extends Component<Props, State> {
    render() {
        return (
            <div>
                <Navbar />
                <div className="m-2">
                    <h4 className="text-center">
                        Select a game from the menu or create a new game by clicking on 'Create Game' button above
                    </h4>
                </div>
            </div>
        );
    }
}

export default GamesMenu;
