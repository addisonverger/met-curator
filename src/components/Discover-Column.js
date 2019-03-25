import React, { Component } from 'react'

import { Form, Image, Icon, Button } from 'react-bulma-components/full'

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
                        className='is-fullwidth font is-black'>
              <option value='sunflowers'>Sunflowers</option>
              <option value='dress'>Dress</option>
              <option value='cats'>Cats</option>
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field className="container">
          <Image className="discoverImage"
                  size='square'
                  src={this.props.image}
                  onClick={() => this.props.updateGallery(this.props.data)}/>
          {this.props.gallery.find((element) => {return element.data.primaryImage === this.props.image}) !== undefined ?
          <Icon className="favorite"
                color='link'>
            <i className="fas fa-3x fa-splotch"></i>
          </Icon> : '' }
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button outlined
                    fullwidth
                    color='black'
                    type='button'
                    className='font'
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
