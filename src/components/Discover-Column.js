import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Image, Button } from 'react-bulma-components/full'

class DiscoverColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagValue: 'sunflowers',
      index: 0
    }
  }
  updateTag(event) {
    this.setState({
      tagValue: event.target.value,
      index: 0
    })
    this.props.updateData(this.props.column, event.target.value, this.state.index)
  }
  updateImage() {
    this.setState({
      index: this.state.index + 1
    })
    this.props.updateData(this.props.column, this.state.tagValue, this.state.index)
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Form.Field>
          <Form.Control>
            <Form.Select value={this.state.tagValue}
                        onChange={(event) => this.updateTag(event)}
                        className='is-fullwidth'>
              <option value='sunflowers'>Sunflowers</option>
              <option value='dress'>Dress</option>
              <option value='cats'>Cats</option>
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Image src={this.props.image}/>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button outlined
                    fullwidth
                    type='button'
                    onClick={() => this.updateImage()}>
              New
            </Button>
          </Form.Control>
        </Form.Field>
      </div>
    )
  }
}

export default DiscoverColumn
