import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Section, Container, Level, Form } from 'react-bulma-components/full'

class MyExhibitions extends Component {
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
      <Section>
        <Container>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Form.Select value={this.state.exhibition}
                            onChange={(event) => this.updateExhibition(event)}
                            className='font is-black'>
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
            </Level.Side>
          </Level>
          <div class="resizable">
            <div class="draggable">
              Image 1
            </div>
            <div class="draggable">
              Image 2
            </div>
          </div>
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

})

export default connect(mapStateToProps, mapDispatchToProps)(MyExhibitions)
