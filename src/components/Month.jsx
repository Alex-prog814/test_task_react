import React, { useState } from 'react';
import Day from './Day';

const Month = ({ days }) => {

    // console.log(days);



  return (
   <>
    {days?.map((day, index) => (
        <>
        <Day key={index} day={day} />
        </>
    ))}
   </>
  )
}

export default Month