import React, { Component } from 'react'

import { Icon, Modal, Card } from 'react-bulma-components/full'

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
      <div>
        <Icon className="top-right"
              color='link'
              onClick={() => this.toggleModal()}>
          <i className="fas fa-3x fa-search-plus"></i>
        </Icon>
        <Modal show={this.state.open} onClose={() => this.toggleModal()}>
          <Modal.Content style={{maxHeight: '100vh'}}>
            <Card>
              <Card.Image src={this.props.data.primaryImage}/>
              <Card.Footer>
                <p style={{margin: 'auto'}}>
                  {this.props.data.artistDisplayName + '. '}
                  {this.props.data.title + '. '}
                  {this.props.data.objectDate + '. '}
                  {this.props.data.medium + '. '}
                  {this.props.data.department + '. '}
                  <a href={this.props.data.objectURL}
                      target='_blank'
                      rel="noopener noreferrer">More info.</a>
                </p>
              </Card.Footer>
            </Card>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ImageModal
