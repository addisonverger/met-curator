import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Image, Button } from 'react-bulma-components/full'

class DiscoverColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagValue: 'sunflowers'
    }
  }
  updateTag(event) {
    this.setState({
      tagValue: event.target.value
    })
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
          <Image src='https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/quick-and-simple-image-placeholders/bcohuFwnmPgIu4aM56YZudq12m02'
                size='1by1' />
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button outlined fullwidth>
              New
            </Button>
          </Form.Control>
        </Form.Field>
      </div>
    )
  }
}

export default DiscoverColumn
