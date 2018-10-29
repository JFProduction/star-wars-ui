import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import moment from 'moment'
import { icons, Default } from '../../assets/icons'

import './Modal.css'
import { Utils } from '../../Utils';

ReactModal.setAppElement("body")

const ModalPres = ({
  open,
  person,
  handleClose
}) => {
  const [tmpPerson, setTempPerson] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let tmpPerson = {...person}
    setTempPerson(tmpPerson)

    Promise.all(person.films.map(f => Utils.get(f)))
      .then(r => {
        tmpPerson.allFilms = r
        setTempPerson(tmpPerson)
        setLoading(false)
      })
  }, [])

  return (
    <ReactModal
      isOpen={open}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button 
        className="btn" 
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "5px 10px",
          fontSize: 20
        }}
      >&times;</button>
      <div
        style={{
          padding: 20
        }}
      >
        <div
          style={{
            textAlign: "center"
          }}
        >
          <img 
            width={140}
            src={icons[tmpPerson.name] || Default} 
            alt="Avatar"
          />
          <h2>{tmpPerson.name}</h2>
        </div>
        {
          loading 
            ? 
              <div 
                style={{
                  textAlign: "center"
                }} 
              >Loading...</div> 
            : 
              <React.Fragment>
                <h4>Casted In:</h4><br />
                {
                  tmpPerson.allFilms && 
                    tmpPerson.allFilms
                      .sort((a, b) => a.release_date > b.release_date)
                      .map((f, i) => 
                        <div key={i} style={{marginBottom: 10}}>
                          <div style={{fontWeight: 500}}>Ep. {f.episode_id} {f.title}</div>
                          <div style={{fontSize: 12}}>{moment(f.release_date, "YYYY-MM-DD").format("MMM DD, YYYY")}</div>
                        </div>
                      )
                }
              </React.Fragment>
        }
      </div>
    </ReactModal>
  )
}

export default ModalPres