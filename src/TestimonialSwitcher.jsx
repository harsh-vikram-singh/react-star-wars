import React from 'react';

const TestimonialSwitcher = props => {
  let direction;
  if (props.direction === 'left') {
    direction =
    <button className='w-8 h-8 rounded-full flex flex-col justify-center items-center shadow hover:text-red-700 hover:shadow-xl hover:cursor-pointer' id='switchLeft'
    onClick={e => props.handleTestimonialSwitcherClick('switchLeft')}
    >
      <p className='text-xl'>{`<`}</p>
    </button>
  } else {
    direction =
    <button className='w-8 h-8 rounded-full flex flex-col justify-center items-center shadow hover:text-red-700 hover:shadow-xl hover:cursor-pointer'
    id='switchRight'
    onClick={e => props.handleTestimonialSwitcherClick('switchRight')}
    >
      <p className='text-xl'>{`>`}</p>
    </button>
  }
  return (
    direction
  )
}

export default TestimonialSwitcher;