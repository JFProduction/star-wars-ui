import React from 'react'
import MainCard from '../containers/MainCard';
import ListCard from '../containers/ListCard'
import { icons, Height, Gender, Default, Films } from '../../assets/icons';
import SimpleCardSubInfo from '../presentations/SimpleCardSubInfo'
import { bindActionCreators } from 'redux';
import { selectPersonFromCard } from '../../sagas/actions';

import {connect} from 'react-redux'


const Layout = ({person, key, layout, cardClick, people}) => {
  const handleCardClick = id => () => {
    let person = people.results.filter(p => p.name === id)[0]
    cardClick(person)
  }

  let color = person.gender === "female" ? "#ff5252" : "#59C3C3"

  if (layout === "card") {
    return (
      <MainCard
        size={263}
        mainText={person.name}
        secondaryText={person.birth_year}
        key={key}
        handleCardClick={handleCardClick}
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
              <div
                style={{
                  color
                }}
              >
                <div className="card-sub-icon-wrapper">
                  <img
                    title="Gender" 
                    src={Gender} 
                    alt="Gender"
                    style={{width: 30, marginTop: 10}}
                  />
                </div>
                {person.gender}
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
                {person.films.length}
              </div>
            )
          }}
        />
      </MainCard>
    )
  } else if (layout === "list") {
    return (
      <ListCard
        key={key}
        info={person}
        small={true}
        handleCardClick={handleCardClick}
        imgSrc={icons[person.name] || Default}
        colInfo={[
          [person.name, `Films - ${person.films.length}`],
          [person.gender],
          [person.mass],
          [person.height]
        ]}
        idInfo={{
          id: person.name
        }}
      />
    )
  }
}

const mapStateToProps = ({people}) => ({people})
const mapDispatchToProps = dispatch => bindActionCreators({
  cardClick: person => selectPersonFromCard(person),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)