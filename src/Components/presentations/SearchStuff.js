import React from 'react'

const SearchStuff = ({search, inputRef}) => (
  <form
    onSubmit={search}
    style={{
      position: "absolute",
      top: -60,
      right: 10
    }}
  >
    <input
      ref={inputRef}
      style={{
        padding: 10,
        width: 150,
        borderRadius: 5,
        border: "1px solid #ddd",
        marginRight: 10
      }}
      placeholder="Global Search..."
    />
    <button
      className="btn"
      type="submit"
    >go</button>
  </form>
)

export default SearchStuff