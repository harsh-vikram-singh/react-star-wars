import React from 'react';

const SingleSearchResult = ({ planetInfo, handlePlanetSelect }) => {
  return (
    <div onClick={() => handlePlanetSelect(planetInfo)}
      className={`mx-auto p-4 flex flex-row ${planetInfo.cssColor} w-4/5 justify-between bg-gray-100`}
    >
      <p><strong>{planetInfo.name}</strong></p>
      <p>population: {planetInfo.population}</p>
    </div>
  )
}

export default SingleSearchResult;