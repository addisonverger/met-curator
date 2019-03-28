import React, { Component } from 'react'

import imageTags from '../Image-Tags.js'

import { Form, Image, Icon, Button } from 'react-bulma-components/full'

class DiscoverColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagValue: '',
      index: 0
    }
  }
  componentDidMount() {
    const randValue = imageTags[Math.floor(Math.random() * imageTags.length)].value;
    this.setState({
      tagValue: randValue
    })
    this.props.setInitialTag(this.props.column, randValue)
  }
  updateTag(event) {
    const nextTag = event.target.value
    this.setState({
      tagValue: nextTag,
      index: 0
    })
    this.props.updateData(this.props.column, nextTag, 0)
  }
  updateImage(event) {
    const nextIndex = this.state.index + 1
    this.setState({
      index: nextIndex
    })
    this.props.updateData(this.props.column, this.state.tagValue, nextIndex)
    event.target.blur()
  }
  render() {
    return (
      <div>
        <Form.Field>
          <Form.Control>
            <Form.Select value={this.state.tagValue}
                        onChange={(event) => this.updateTag(event)}
                        className='is-fullwidth is-black'>
              {imageTags.map((tag, index) => {
                return (
                  <option value={tag.value}
                          key={index}>
                    {tag.name}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field className="imageContainer">
          <Image className="discoverImage"
                  size='square'
                  src={this.props.image}
                  onClick={() => this.props.updateGallery(this.props.data)}/>
          {this.props.gallery.find((element) => {return element.data.primaryImage === this.props.image}) !== undefined ?
          <Icon className="favorite"
                color='warning'>
            <i className="fas fa-3x fa-splotch"></i>
          </Icon> : '' }
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button outlined
                    fullwidth
                    color='black'
                    type='button'
                    onClick={(event) => this.updateImage(event)}>
              New
            </Button>
          </Form.Control>
        </Form.Field>
      </div>
    )
  }
}

export default DiscoverColumn
