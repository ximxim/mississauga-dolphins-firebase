import React from 'react';

import { DateTime, Dropdown } from '../../../../components/ui';

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
          <div className="col">
              {this.renderSearchBar()}
              {this.renderFilter()}
              {this.renderSort()}
              {this.renderGameCards()}
          </div>
      );
    }

  renderSearchBar = () => <p>Search bar goes here</p>;

  renderFilter = () => (
      <Dropdown
        label="Filter"
        options={[
          { value: 'Inactive' },
          { value: 'Active' },
        ]}
      />
  );

  renderSort = () => <p>Sort bar goes here</p>;

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
