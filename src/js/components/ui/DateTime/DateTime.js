/* @flow */
import React from 'react';
import moment from 'moment';

type Props = {
    datetime: string
};

type State = {
    show: Boolean,
};

class DateTime extends React.Component<Props, State> {
    state: State = {
      show: false,
    }

    props: Props;

    render() {
      const { show } = this.state;
      const { datetime } = this.props;
      const realDateTime = moment(datetime).format('MMMM Do YYYY, h:mm: a');
      const humanFriendly = moment(datetime).fromNow();
      const displayDatetime = show ? realDateTime : humanFriendly;
      return (
          <a onClick={this.toggleDatetime}>{displayDatetime}</a>
      );
    }

    toggleDatetime = () => this.setState(state => ({ show: !state.show }));
}

export default DateTime;
