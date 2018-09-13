import React from 'react'
import { Utils } from '../../Utils';
import ModalPres from '../presentations/ModalPres';

class MyModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: props.open,
      info: {
        person: {...props.person},
        films: []
      }
    }
  }

  componentDidMount() {
    let info = {...this.state.info}
    
    Promise.all(info.person.films.map(f => Utils.get(f)))
      .then(r => {
        info.films = r
        this.setState({info})
      })
  }

  render() {
    const {
      info,
      modalOpen
    } = this.state

    return (
      <div>
      {
        info.films.length > 0 &&
          <ModalPres
            open={modalOpen}
            handleClose={this.props.handleClose}
            info={info}
          />
      }
      </div>
    )
  }
}

export default MyModal