import React, { Component } from 'react'

import { Modal } from 'react-bulma-components/full'

class About extends Component {
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
        <div className="clickables" onClick={() => this.toggleModal()}>About</div>
        <Modal show={this.state.open} onClose={() => this.toggleModal()}>
          <Modal.Content className="about">
            <p>
              Welcome to <span className="site-header">Now On View</span>, an online resource that explores the Metropolitan Museum of Art’s encyclopedic collection.*
            </p>
            <br />
            <p>
              <u>DISCOVER</u> artworks in the collection by selecting different tags. Select images to save them to your gallery.
            </p>
            <br/>
            <p>
              Zoom in on each artwork in your <u>GALLERY</u> to learn additional information. Select images to sort them into exhibitions.
            </p>
            <br />
            <p>
              Organize your <u>EXHIBITIONS</u> however you choose by positioning artworks in the workspace.
            </p>
            <br />
            <p style={{fontSize: '1rem'}}>
              *This website utilizes The Metropolitan Museum of Art Collection API and only includes artworks that the museum believes to be available in the public domain.
            </p>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default About
