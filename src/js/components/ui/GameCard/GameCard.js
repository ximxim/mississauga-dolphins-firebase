import React from 'react';

import { DateTime } from '..';
import { Card } from './GameCard.styled';


type Props = {
    event: {
        id: string,
        title: string,
        start_time: string,
        game_id: string,
    },
}

class GameCard extends React.Component<Props, *> {
    props: Props;

    render() {
      const { event } = this.props;
      return (
          <Card className="border-top px-1 py-2" key={event.id}>
              <div>
                  <h6 className="text-left mb-0">
                      <a href="#">
                          {event.title}
                      </a>
                  </h6>
              </div>
              <div>
                  <p className="d-inline heading mr-1 mb-0">Start date:</p>
                  <DateTime datetime={event.start_time} />
              </div>
              <div>
                  <p className="d-inline heading mr-1 mb-0">Scored:</p>
                  <p className="d-inline  mr-1 mb-0">{event.game_id ? 'Yes' : 'No'}</p>
              </div>
          </Card>
      );
    }
}

export default GameCard;
