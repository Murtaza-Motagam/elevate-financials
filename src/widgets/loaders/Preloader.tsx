import React from 'react';

const Preloader = () => {
  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-transparent items-center justify-center'>
      <div className='flex flex-col justify-center items-center gap-y-5 p-10 rounded-xl backdrop-blur-md'>
        <div className='preloader'></div>
        <h2 className='text-xl sm:text-3xl font-semibold text-primary dark:text-gray-200'>
          Elevate Financials
        </h2>
      </div>
    </div>
  );
};

export default Preloader;
