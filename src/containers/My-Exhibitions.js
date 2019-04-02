import React, { Component } from 'react'
import { connect } from 'react-redux'
import EdgeScroll from 'edge-scroll'

import ExhibitionWorkspace from '../components/Exhibition-Workspace.js'

import { Section, Container, Level, Form, Button } from 'react-bulma-components/full'

// const edgeScroll = new EdgeScroll(120, 750)

class MyExhibitions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibition: 'select',
      index: -1
    }
  }
  updateExhibition(event) {
    const nextExhibition = event.target.value
    let newIndex = this.props.exhibitions.findIndex((exhibition) => {
      return exhibition.title === nextExhibition
    })
    this.setState({
      exhibition: nextExhibition,
      index: newIndex
    })
  }
  handleRemoveExhibition() {
    this.props.removeExhibition(this.state.exhibition)
    this.setState({
      exhibition: 'select',
      index: -1
    })
  }
  render() {
    return (
      <Section>
        <Container>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Form.Select value={this.state.exhibition}
                            onChange={(event) => this.updateExhibition(event)}
                            className='is-black'>
                  <option key='0'
                          value='select'>
                    Select an Exhibition
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
              {this.state.exhibition !== 'select' ?
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        onClick={() => this.handleRemoveExhibition()}>
                  Remove
                </Button>
              </Level.Item> : ''}
            </Level.Side>
          </Level>
          <ExhibitionWorkspace currentExhibition={this.props.exhibitions[this.state.index]}
                                index={this.state.index}
                                updateExhibitionImageCoordinates={this.props.updateExhibitionImageCoordinates}/>
        </Container>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  exhibitions: state.exhibitions
})

const mapDispatchToProps = (dispatch) => ({
  removeExhibition: (title) => dispatch({type: 'REMOVE_EXHIBITION', title: title}),
  updateExhibitionImageCoordinates: (exhibition, objectIndex, x, y) => dispatch({type: 'UPDATE_EXHIBITION_IMAGE_COORDINATES', exhibition: exhibition, objectIndex: objectIndex, x: x, y: y})
})

export default connect(mapStateToProps, mapDispatchToProps)(MyExhibitions)
