import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center loading'>
    <CirclesWithBar
    height="200"
    width="200"
    color="#4fa94d"
    outerCircleColor="#4fa94d"
    innerCircleColor="#4fa94d"
    barColor="#4fa94d"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  </div>
  )
}
