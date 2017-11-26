import express from 'express';
import algoliasearch from 'algoliasearch';
import { SearchResults, SearchParameters } from 'algoliasearch-helper';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app';
import template from './template';

const server = express();
const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

server.use('/assets', express.static('assets'));

server.get('/', async (req, res) => {
  // Create the state for SearchResults & resultsState
  const state = SearchParameters.make({
    hitsPerPage: 3,
    facets: ['category'],
    facetFilters: [['category:Small storage', 'category:Eating']],
  });

  // Make the request to Algolia with the search for multiple indexes
  // see: https://www.algolia.com/doc/api-reference/api-methods/multiple-queries/
  const response = await client.search([
    {
      indexName: 'ikea',
      query: '',
      params: {
        hitsPerPage: 3,
        facets: ['category'],
        facetFilters: [['category:Small storage', 'category:Eating']],
      },
    },
  ]);

  // Create the custom resultsState props
  const resultsState = {
    content: new SearchResults(state, response.results),
    _originalResponse: response,
    state,
  };

  // Create the initialState props
  const initialState = {
    resultsState,
  };

  const appString = renderToString(
    <App {...initialState} />
  );

  res.send(
    template({
      body: appString,
      title: 'Hello World from the server',
      initialState: JSON.stringify(initialState),
    })
  );
});

server.listen(8080);

console.log('listening on 8080');
