/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToggleConsumer } from '../SubNav';
import { SubNavBarStyled, SubToggleButton } from './SubNavbar.styled';

type Props = {}

type State = {}

class SubNavbar extends React.Component<Props, *> {
  state: State = {}

  props: Props;

  render() {
    return (

        <SubNavBarStyled className="bg-white shadow px-3 py-2">
            <div>
                {this.toggleSidebar()}
            </div>
        </SubNavBarStyled>
    );
  }

  toggleSidebar = () => (
      <ToggleConsumer>
          {({ toggleSubSidebar }) => (
              <SubToggleButton
                aria-label="Toggle Sidebar"
                className="mr-2"
                onClick={toggleSubSidebar}
              >
                  <FontAwesomeIcon icon="align-justify" />
              </SubToggleButton>
          )}
      </ToggleConsumer>
  );
}

export default SubNavbar;
