import React, { Component } from 'react'

import { Footer, Container, Level, Button, Form } from 'react-bulma-components/full'

class GalleryFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibition: 'new',
      newExhibition: ''
    }
  }
  updateExhibition(event) {
    const nextExhibition = event.target.value
    this.setState({
      exhibition: nextExhibition
    })
  }
  updateNewExhibition(event) {
    const newExhibitionValue = event.target.value
    this.setState({
      newExhibition: newExhibitionValue
    })
  }
  handleNewExhibition = (event) => {
    this.props.addExhibition(this.state.newExhibition)
    this.setState({
      newExhibition: ''
    })
    event.target.blur()
  }
  handle
  render() {
    return (
      <Footer id='footer'>
        <Container>
          <Level>
            <Level.Side align='left'>
              <Level.Item>
                <Form.Select value={this.state.exhibition}
                            onChange={(event) => this.updateExhibition(event)}
                            className='font is-black'>
                  <option key="0"
                          value="new">
                    New Exhibition
                  </option>
                  {this.props.exhibitions.map((exhibition, index) => {
                    return (
                      <option key={index + 1}
                              value={exhibition.title}>
                        {exhibition.title}
                      </option>
                    )
                  })}
                </Form.Select>
              </Level.Item>
              {this.state.exhibition === 'new' ?
              <Level.Item>
                <Form.Input value={this.state.newExhibition}
                            onChange={(event) => this.updateNewExhibition(event)}
                            className='is-black'>
                </Form.Input>
              </Level.Item> : ''}
              {this.state.exhibition === 'new' ?
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        onClick={(event) => this.handleNewExhibition(event)}>
                  Add
                </Button>
              </Level.Item> : ''}
              {this.state.exhibition !== 'new' ?
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        onClick={() => this.props.moveExhibition(this.state.exhibition)}>
                  Move to
                </Button>
              </Level.Item> : ''}
            </Level.Side>
            <Level.Side align='right'>
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        onClick={() => this.props.deselectAllImages()}>
                  Deselect All
                </Button>
              </Level.Item>
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
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
