import React from 'react';

const PlanetInfo = ({ selectedPlanetInfo }) => {
  return (
    <div>
      { selectedPlanetInfo === '' ?
        <div className='text-center text-gray-400'>
          Search and select a Planet to see detailed information
        </div>
        : (
          <div className='w-2/3 shadow rounded-md my-10 text-white p-2 mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            <h1 className='text-4xl text-center mb-4'>{selectedPlanetInfo.name}</h1>
            <div className='grid grid-cols-2 gap-x-4'>
              <p>Population: {selectedPlanetInfo.population}</p>
              <p>Climate: {selectedPlanetInfo.climate}</p>
              <p>Diameter: {selectedPlanetInfo.diameter}</p>
              <p>Gravity: {selectedPlanetInfo.gravity}</p>
              <p>Orbital Period: {selectedPlanetInfo.orbital_period}</p>
              <p>Rotation Period: {selectedPlanetInfo.rotation_period}</p>
              <p>Terrain: {selectedPlanetInfo.terrain}</p>
              <p>This planet has appeared in {selectedPlanetInfo.films.length} star wars movies</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PlanetInfo;