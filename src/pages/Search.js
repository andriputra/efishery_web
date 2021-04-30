import React from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

export const Search = ({
  search,
  onChangeValue,
  btnSearch,
  btnClear
}) => {
  return (
    <form onSubmit={btnSearch} id="search" className="wrapper-search">
      <div style={{ width: '100%', position: 'relative', display: 'flex' }}>
        <input placeholder="Search" type="text" className="form-control search"
          value={search}
          onChange={onChangeValue}
        />
        {
          search ?
            <FaTimes className="clear-text" onClick={btnClear} />
            : null
        }
      </div>
      <div className="btn btn-secondary btnsearch" onClick={btnSearch}>
        <FaSearch />
      </div>
    </form>
  )
}