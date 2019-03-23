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
    const nextTag = event.target.value
    this.setState({
      tagValue: nextTag,
      index: 0
    })
    this.props.updateData(this.props.column, nextTag, 0)
  }
  updateImage() {
    const nextIndex = this.state.index + 1
    this.setState({
      index: nextIndex
    })
    this.props.updateData(this.props.column, this.state.tagValue, nextIndex)
  }
  render() {
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
          <Image className="discoverImage"
                  size='square'
                  src={this.props.image}
                  onClick={() => this.props.updateGallery(this.props.data)}/>
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
