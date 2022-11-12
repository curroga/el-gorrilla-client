import React, { useState } from 'react'

function Search(props) {
  const [searchInput, setSearchInput] = useState("")
  const handleChange = (e) => {
    setSearchInput(e.target.value)
    props.filterCalles(e.target.value)
  }
  return (
    <div>
      <h5>Search</h5>
      <input type="text" name='search' value={searchInput} onChange={handleChange} />
    </div>
  )
}

export default Search