/* @flow */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormGroup, Label, Input } from 'reactstrap';
import { Sidebar, ToggleButton } from './Sidebar.styled';

type Props = {
    isOpen: Boolean,
    toggleSidebar: () => void,
};

type State = {};

class SubSidebar extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <Sidebar isOpen={this.props.isOpen} className="shadow">
              <div className="bg-dark px-2 pt-2">
                  <ToggleButton aria-label="Toggle Sidebar" onClick={this.props.toggleSidebar}>
                      <FontAwesomeIcon icon="window-close" />
                  </ToggleButton>
                  <FormGroup>
                      <Label for="subSidebarSearch">Search</Label>
                      <Input type="text" name="search" id="subSidebarSearch" placeholder="Search..." />
                  </FormGroup>
              </div>
          </Sidebar>
      );
    }
}

export default SubSidebar;
