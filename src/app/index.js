import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch/dom';
import { createInstantSearch } from 'react-instantsearch/server';

const { InstantSearch, findResultsState } = createInstantSearch();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchState: props.searchState,
    };
  }

  onSearchStateChange = searchState => {
    this.setState(() => ({
      searchState,
    }));
  };

  render() {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="ikea"
        resultsState={this.props.resultsState}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
      >
        <Configure hitsPerPage={3} />
        <SearchBox />
        <Hits />
        <RefinementList attributeName="category" />
      </InstantSearch>
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object,
  searchState: PropTypes.object,
};

export { App, findResultsState };
