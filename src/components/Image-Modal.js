import React, { Component } from 'react'

import { Icon, Modal, Image } from 'react-bulma-components/full'

class ImageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggleModal() {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    return (
      <div className="top-right">
        <Icon color='warning'
              onClick={() => this.toggleModal()}>
          <i className="fas fa-4x fa-search-plus"></i>
        </Icon>
        <Modal show={this.state.open} onClose={() => this.toggleModal()}>
          <Modal.Card>
            <Modal.Card.Body>
              <Image src={this.props.data.primaryImage}/>
            </Modal.Card.Body>
            <Modal.Card.Foot>
              <p style={{textAlign: 'center', margin: 'auto'}}>
                {this.props.data.artistDisplayName !== '' ? this.props.data.artistDisplayName + '. ' : ''}
                <i>{this.props.data.title !== '' ? this.props.data.title + '. ' : ''}</i>
                {this.props.data.objectDate !== '' ? this.props.data.objectDate + '. ' : ''}
                {this.props.data.medium !== '' ? this.props.data.medium + '. ' : ''}
                {this.props.data.department !== '' ? this.props.data.department + '. ' : ''}
                <a href={this.props.data.objectURL}
                    target='_blank'
                    rel="noopener noreferrer">More info.</a>
              </p>
            </Modal.Card.Foot>
          </Modal.Card>
        </Modal>
      </div>
    )
  }
}

export default ImageModal
