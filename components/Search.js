import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { PrismicLink} from "@prismicio/react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/satellite.css';

const algoliaClient = algoliasearch('ZOD69WAA6L', 'c6bcb62168c4e4eee992a4cd52256da4');
function Hit({ hit }) {
  return (
      <PrismicLink href={`/articles/${hit.slug}`}>{hit.title}</PrismicLink>
  );
}
const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};
export const AlgoliaSearch = ({ }) => (
  <section className="pt-8">
    <div className="mx-auto w-full max-w-xl">      
      <InstantSearch indexName="articles" searchClient={searchClient}>
        <SearchBox
          classNames={{
            root: '',
            form: 'relative bg-transparent',
            input: 'block w-full pl-9 pr-3 py-2 primary-content border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
            submitIcon: 'absolute top-0 left-0 bottom-0 w-6',
          }}
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  </section>
);