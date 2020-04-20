import React from 'react'

const Filter = ({handleFilterChange}) => {
return (
  <div>
    filter by name:
    <input onChange={handleFilterChange}/>
  </div>
)
}

export default Filter