import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { requestPersonApi } from '../../sagas/actions';

const inputRef = React.createRef()

export const SearchStuff = ({requestPerson}) => {
  const search = e => {
    e.preventDefault()
    
    if (inputRef.current.value.trim().length > 0) {
      requestPerson(`https://swapi.co/api/people?search=${inputRef.current.value}`)
    }
  }

  return (
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
}

const mapDispatchToProps = dispatch => bindActionCreators({
  requestPerson: url => requestPersonApi(url)
}, dispatch)

export default connect(undefined, mapDispatchToProps)(SearchStuff)