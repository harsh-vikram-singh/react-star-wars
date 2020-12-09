import React from 'react';
import SingleSearchResult from './SingleSearchResult';

const SearchResults = ({searchResults, searchTerm, handlePlanetSelect, isOverLimit}) => {
  let resultsArray;
  if (isOverLimit) {
    return (
      <div>
        <p className='text-center, text-lg p-5'>Can not make more than 15 requests per minute</p>
      </div>
    )
  } else if (Array.isArray(searchResults) && searchResults.length > 0 && !isOverLimit) {
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
        <p className='text-center text-lg p-5'>No results found!</p>
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