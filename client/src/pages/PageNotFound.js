import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
      <h3>{"Page not found :("}</h3>
      <label>try this link: <Link to={"/"}>Go To Homepage</Link></label>
    </div>
  )
}

export default PageNotFound
