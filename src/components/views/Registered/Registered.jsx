import React from 'react'

import './Registered.css'

export const Registered = () => {


  const teamID= localStorage.getItem('teamID')
  return (
    <div className='teamID'>El team Id de tu equipo es :{teamID}</div>
  )
}
