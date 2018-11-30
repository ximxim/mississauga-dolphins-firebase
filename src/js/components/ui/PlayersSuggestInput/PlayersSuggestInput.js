import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import styles from './styles';
import { Player } from '../../../redux/modules/Players/types';

type Props = {
	value: string,
	placeholder: string,
	players: Array<Player>,
	onChange: () => void,
	onSuggestionSelected: () => void,
};

type State = {};

export default class PlayersSuggestInput extends Component<Props, State> {
    state: State = {
      playersSuggestion: [],
    };

    render() {
      const { playersSuggestion } = this.state;
      const { value, onChange, placeholder } = this.props;

      return (
          <Autosuggest
              suggestions={playersSuggestion}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.props.onSuggestionSelected}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              theme={styles.autoSuggestTheme}
              inputProps={{
                placeholder,
                value,
                onChange,
              }}
          />
      );
    }

    getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return inputLength === 0
        ? []
        : this.props.players.filter(
          player => player.FIRST_NAME.toLowerCase().indexOf(inputValue)
                          >= 0
                      || player.LAST_NAME.toLowerCase().indexOf(inputValue) >= 0,
        );
    };

    getSuggestionValue = player => `${player.FIRST_NAME} ${player.LAST_NAME}`;

    renderSuggestion = player => (
        <div>
            {player.FIRST_NAME}
            {' '}
            {player.LAST_NAME}
        </div>
    );

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        playersSuggestion: this.getSuggestions(value),
      });
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        playersSuggestion: [],
      });
    };
}
