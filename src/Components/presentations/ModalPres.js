import React from 'react'
import ReactModal from 'react-modal'
import moment from 'moment'
import { icons } from '../../assets/icons';

ReactModal.setAppElement("body")

const ModalPres = ({open, handleClose, info}) => (
  <ReactModal
    isOpen={open}
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
      <img 
        width={140}
        src={icons[info.person.name]} 
        alt="Avatar"
      />
      <h2>{info.person.name}</h2>
      <h4>Casted In:</h4>
      {
        info.films.map((f, i) => 
          <p key={i}>
            Ep. {f.episode_id} {f.title}
            <div>Made: {moment(f.created, "YYYY-MM-DD").format("MMM DD, YYYY")}</div>
          </p>
        )
      }
    </div>
  </ReactModal>
)

export default ModalPres