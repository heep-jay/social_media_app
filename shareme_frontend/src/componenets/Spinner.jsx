import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full my-10">
        <Circles
           ariaLabel="loading"
           color="#00BFFF"
           height={70}
           width={200}
           className="mx-5"
        />
        <p className="text-lg text-center px-3">{message}</p>
    </div>
  )
}

export default Spinner