import React from 'react';

import { FormGroup, Label, Input } from 'reactstrap';

class SearchBar extends React.Component<*, *> {
  render() {
    return (
        <FormGroup className="mb-0">
            <Label className="d-none" for="search">Search</Label>
            <Input
              className="rounded-0 px-3 py-1"
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
        </FormGroup>
    );
  }
}

export default SearchBar;
