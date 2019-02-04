import React, { useEffect } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {
  icons, 
  Height, 
  Planet, 
  Default, 
  Films
} from '../assets/icons'
import { gqlGetPeopleCur } from '../sagas/actions'
import MainCard from './containers/MainCard'
import SimpleCardSubInfo from './presentations/SimpleCardSubInfo'

const Rql = ({ people, getPeopleCur}) =>  {
  useEffect(() => {
    getPeopleCur()
  }, [])

  console.log(people)
  return (
    <React.Fragment>
      <div>
        <button 
          onClick={() => getPeopleCur({
            cursorBefore: people.pageInfo.endCursor,
            cursorAfter: people.pageInfo.startCursor
          })}
        >
          prev
        </button>
        <button 
          onClick={() => getPeopleCur({cursorAfter: people.pageInfo.endCursor})}
        >
          after
        </button>
      </div>
    {
      people && people.people && people.people.map(person => (
        <MainCard
          key={person.name}
          handleCardClick={() => () => console.log(person.name)}
          size={263}
          mainText={person.name}
          secondaryText={person.birthYear}
          idInfo={{
            id: person.name
          }}
          imgSrc={icons[person.name] || Default}
        >
          <SimpleCardSubInfo
            infoOne={{
              content: (
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="Height" 
                      src={Height} 
                      alt="Height"
                      style={{width: 50}}
                    />
                  </div>
                  {person.height}
                </div>
              )
            }}
            infoTwo={{
              content: (
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="Planet" 
                      src={Planet} 
                      alt="Planet"
                      style={{width: 30, marginTop: 10}}
                    />
                  </div>
                  {person.homeworld.name}
                </div>
              )
            }}
            infoThree={{
              content: (
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="films" 
                      src={Films} 
                      alt="films"
                      style={{width: 30, marginTop: 10}}
                    />
                  </div>
                  {person.filmConnection.films.length}
                </div>
              )
            }}
          />
        </MainCard>
      ))
    }
    </React.Fragment>
  )
}

const mapStateToProps = ({people}) => ({people}) 

const mapDispatchToProps = dispatch => bindActionCreators({
  getPeopleCur: payload => gqlGetPeopleCur(payload)
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Rql)