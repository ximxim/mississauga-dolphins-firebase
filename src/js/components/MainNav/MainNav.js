/* @flow */
import React from 'react';

type Props = {
    children: Object,
};

class MainNav extends React.Component<Props, *> {
    props: Props;

    render() {
      return (
          <div className="">
              {this.props.children}
          </div>
      );
    }
}

export default MainNav;
