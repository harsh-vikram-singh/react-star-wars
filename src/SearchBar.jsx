import React from 'react';

const SearchBar = (props) => {
  return (
    <div className=''>
      <p className='text-center my-2 mx-auto'>Search for a planet</p>
      <form className='flex flex-col'>
        <input type='text'
          className='mx-auto min-w-min p-2 bg-purple-400 focus:outline-none focus:ring focus:border-red-300 rounded-lg text-center placeholder-white'
          value={props.searchTerm}
          placeholder='enter the planet name'
          onChange={e => props.captureSearchInput(e.target.value)}
        ></input>
      </form>
    </div>
  )
}

export default SearchBar;