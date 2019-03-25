import React, { Component } from 'react'

import { Footer, Container, Level, Button, Form } from 'react-bulma-components/full'

class GalleryFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibition: 'exhib 1'
    }
  }
  updateExhibition(event) {
    const nextExhibition = event.target.value
    this.setState({
      exhibition: nextExhibition
    })
  }
  render() {
    return (
      <Footer id='footer'>
        <Container>
          <Level>
            <Level.Side align='left'>
              <Level.Item>
                  Move to
              </Level.Item>
              <Level.Item>
                <Form.Select value={this.state.tagValue}
                            className='font is-black'>
                  <option>Exhib 1</option>
                  <option>Exhib 2</option>
                  <option>Exhib 3</option>
                </Form.Select>
              </Level.Item>
            </Level.Side>
            <Level.Side align='right'>
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        className='font'
                        onClick={() => this.props.removeImage()}>
                  Remove
                </Button>
              </Level.Item>
            </Level.Side>
          </Level>
        </Container>
      </Footer>
    )
  }
}

export default GalleryFooter
