import React from 'react';
import Image from 'next/image';
import SpinnerGif from '../public/spinner.gif';

const Spinner = () => {
  return (
    <div>
      <Image
        src={SpinnerGif}
        alt='Loading...'
        className='w-[200px] m-auto block'
      />
    </div>
  )
}

export default Spinner;