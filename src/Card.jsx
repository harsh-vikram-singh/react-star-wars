import React from 'react';

const Card = ({testimonialNumber, testimonials}) => {
  let idx = testimonialNumber;
  let testimonialsArray = testimonials.testimonials;
  return (
    <figure className='bg-white border shadow-sm flex w-min rounded-lg overflow-hidden m-auto'>
      <div className='w-56 h-72'>
        <img className=''
          src= {testimonialsArray[idx].imgUrl}
          alt= {testimonialsArray[idx].name}
        />
      </div>
      <div className='p-8 flex flex-col justify-between'>
        <p className='text-lg font-semibold text-gray-800 w-96'>
          "{testimonialsArray[idx].quote}"
        </p>
        <figcaption className='font-medium'>
          <div className='text-red-800 font-semibold'>
          {testimonialsArray[idx].name}
          </div>
          <div className='text-gray-500'>
            {testimonialsArray[idx].designation}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

export default Card;