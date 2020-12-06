import React from 'react';
import SingleSearchResult from './SingleSearchResult';

const SearchResults = ({searchResults, searchTerm, handlePlanetSelect}) => {
  let resultsArray;
  if (Array.isArray(searchResults) && searchResults.length > 0) {
    resultsArray = searchResults.map((val, idx) => {
      return <SingleSearchResult
        key={idx}
        planetInfo={val}
        handlePlanetSelect={handlePlanetSelect}
      />
    })
  } else if (searchTerm !== ''){
    return (
      <div>
        <p className='text-center'>No results found!</p>
      </div>
    )
  }
  return (
    <div>
      {resultsArray}
    </div>
  );
};

export default SearchResults