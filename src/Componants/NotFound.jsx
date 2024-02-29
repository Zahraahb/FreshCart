import React from 'react'
import error from '../assets/error.svg'

export default function NotFound() {
  return (
    <div className='text-center'>
      <img src={error} alt="error" />
    </div>
  )
}
