import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PlanetInfo from './PlanetInfo';

const Planets = (props) => {
  console.log('props to Planets page: ', props)
  const [username, setUsername] = useState(
    () => window.localStorage.getItem('username')
  )
  const [searchTerm, setSearchTerm] = useState(() => '');
  const [searchResults, setSearchResults] = useState(() => '');
  const [selectedPlanetInfo, setSelectedPlanetInfo] = useState(() => '');

  useEffect(
    () => {
      if ((username === "") || (username === 'undefined')) {
        props.history.push('/');
      }
    }, [username, props.history]
  )

  const getRange = resultsArray => {
    let min = Infinity;
    let max = -Infinity;
    for (let result of resultsArray) {
      let population = result.population === 'unknown' ? min : parseInt(result.population);
      if (population < min) {
        min = population;
      }
      if (population > max) {
        max = population;
      }
    }
    return [min, max];
  }

  // not used to set state, not a part of hooks
  const setSize = (resultsArray, rangeArray) => {
    // console.log('rangeArray: ', rangeArray)
    let range = rangeArray[1] - rangeArray[0];
    // console.log('range: ', range)
    let finalResults = resultsArray.map(result => {
      let population = result.population === 'unknown' ? 'unknown' : parseInt(result.population);
      // console.log('population: ', population);
      if (population === 'unknown') {
        // set color, text size
        // console.log('inside first if')
        result.cssColor = 'text-red-500';
        result.cssTextSize = 'text-xs'
      } else if ((rangeArray[0] <= population) && (population < rangeArray[0] + range/8)) {
        // console.log('inside if');
        result.cssColor = 'bg-green-50';
        result.cssTextSize = 'text-xs';
      } else if ((rangeArray[0] + range/8 <= population) && (population < rangeArray[0] + (2 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-100';
        result.cssTextSize = 'text-base';
      } else if ((rangeArray[0] + (2* (range/8)) <= population) && (population < rangeArray[0] + (3 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-200';
        result.cssTextSize = 'text-base';
      } else if ((rangeArray[0] + (3 * (range/8)) <= population) && (population < rangeArray[0] + (4 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-300';
        result.cssTextSize = 'text-lg';
      } else if ((rangeArray[0] + (4 * (range/8)) <= population) && (population < rangeArray[0] + (5 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-400';
        result.cssTextSize = 'text-lg';
      } else if ((rangeArray[0] + (5 * (range/8)) <= population) && (population < rangeArray[0] + (6 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-500';
        result.cssTextSize = 'text-xl';
      } else if ((rangeArray[0] + (6 * (range/8)) <= population) && (population < rangeArray[0] + (7 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-600';
        result.cssTextSize = 'text-2xl';
      } else if ((rangeArray[0] + (7 * (range/8)) <= population) && (population <= rangeArray[0] + (8 * (range/8) ))) {
        // console.log('inside if');
        result.cssColor = 'bg-green-700';
        result.cssTextSize = 'text-3xl';
      }
      return result;
    })
    return finalResults;
  }

  useEffect(() => {
    if (searchTerm !== '') {
      axios.get('https://swapi.dev/api/planets', {
        params: {
          search: searchTerm
        }
      })
        .then(response => {
          // console.log(response.data.results)
          // console.log(getRange(response.data.results));
          let rangeArray = getRange(response.data.results);
          let finalResults = setSize(response.data.results, rangeArray);
          // console.log('final results: ', finalResults);
          setSearchResults(finalResults);
        })
        .catch(error => console.log('following error occured while trying to access planets data: ', error));
    }
  }, [searchTerm]);

  const captureSearchInput = (inputValue) => {
    if (inputValue !== '') {
      setSearchTerm(inputValue);
    } else if (inputValue.length === 0) {
      setSearchTerm('');
      setSearchResults('');
    }
  }

  const handlePlanetSelect = (planetInfo) => {
    setSelectedPlanetInfo(planetInfo);
    setSearchTerm('');
    setSearchResults('')
    setSearchTerm('')
  }

  return (
    <div>
      <div className='flex flex-row justify-center items-center'>
        <div className=''>
          <h1 className='text-6xl tracking-wide py-10 font-bold text-gray-700 text-center'>React Star Wars</h1>
        </div>
        <div className='pl-40 flex flex-row items-center'>
          <p className='text-xl mr-2'>Welcome, {username}</p>
          <button className='rounded shadow-lg p-2 bg-yellow-500 hover:bg-yellow-400'
            onClick={() => {
              props.history.replace('/planets', [false, '']);
              window.localStorage.setItem('username', '');
              setUsername('')}
            }
          >Logout</button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-2'>
      {/* // <div className='flex flex-row justify-between'> */}
        <div>
          <SearchBar
            captureSearchInput={captureSearchInput}
            searchTerm={searchTerm}
          />
          <SearchResults
            searchResults={searchResults}
            searchTerm={searchTerm}
            handlePlanetSelect={handlePlanetSelect}
          />
        </div>
        <div>
          <PlanetInfo
            selectedPlanetInfo={selectedPlanetInfo}
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Planets);