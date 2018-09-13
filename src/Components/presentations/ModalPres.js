import React from 'react'
import ReactModal from 'react-modal'
import moment from 'moment'
import { icons, Default } from '../../assets/icons';

import './Modal.css'

ReactModal.setAppElement("body")

const ModalPres = ({open, handleClose, info}) => (
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
          src={icons[info.person.name] || Default} 
          alt="Avatar"
        />
        <h2>{info.person.name}</h2>
      </div>
      <h4>Casted In:</h4>
      {
        info.films.sort((a, b) => a.release_date > b.release_date).map((f, i) => 
          <div key={i} style={{marginBottom: 10}}>
            <div style={{fontWeight: 500}}>Ep. {f.episode_id} {f.title}</div>
            <div style={{fontSize: 12}}>{moment(f.release_date, "YYYY-MM-DD").format("MMM DD, YYYY")}</div>
          </div>
        )
      }
    </div>
  </ReactModal>
)

export default ModalPres