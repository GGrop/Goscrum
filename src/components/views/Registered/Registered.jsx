import React from 'react'
import {useParams} from 'react-router-dom'
import './Registered.css'

export const Registered = () => {

  const {teamID}=useParams()

  return (
    <div className='teamID'>El team Id de tu equipo es :{teamID}</div>
  )
}
