import React from 'react';

import {
  SearchBar, DateTime, SortControl, Dropdown,
} from '../../../../components/ui';

import { GameCard } from './SidebarContent.styled';

type Props = {};

type State = {
}

class SidebarContent extends React.Component<Props, State> {
    state: State = {
    }

    props: Props;

    render() {
      return (
          <div>
              {this.renderSearchBar()}
              {this.renderFilter()}
              {this.renderSort()}
              {this.renderGameCards()}
          </div>
      );
    }

  renderSearchBar = () => <SearchBar />

  renderFilter = () => (
      <Dropdown
        label="Filter"
        options={[
          { value: 'Inactive' },
          { value: 'Active' },
        ]}
      />
  );

  renderSort = () => (
      <div className="pt-2 text-center">
          <SortControl />
      </div>
  );

  renderGameCards = () => <p>Games cards goe here</p>;

  renderGameCard = ({ game }) => (
      <GameCard key={game.id}>
          <ul className="list-unstyled">
              <li>
                  <h6 className="text-left">
                      <a href="#">
                          {game.title}
                      </a>
                  </h6>
              </li>
              <li>
                  <h6>Start date</h6>
                  <DateTime datetime={game.start_time} />
              </li>
          </ul>
      </GameCard>
  );
}

export default SidebarContent;
