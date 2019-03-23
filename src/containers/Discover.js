import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import DiscoverColumn from '../components/Discover-Column.js'

import { Section, Container, Columns } from 'react-bulma-components/full'

class Discover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column1: {
        tag: 'sunflowers',
        image: '',
        data: ''
      },
      column2: {
        tag: 'sunflowers',
        image: '',
        data: ''
      },
      column3: {
        tag: 'sunflowers',
        image: '',
        data: ''
      }
    }
  }
  getImage(column, tag, index) {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + tag)
    .then((response) => {
      let objectID = response.data.objectIDs[index]
      axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID)
      .then((response) => {
        let image = response.data.primaryImage
        let data = response.data
        this.setState({
          [column]: {
            tag: tag,
            image: image,
            data: data
          }
        })
      })
      .catch((error) => {console.log(error)})
    })
    .catch((error) => {console.log(error)})
  }
  componentDidMount() {
    Object.entries(this.state).forEach((column) => {
      this.getImage(column[0], column[1].tag, 0)
    })
  }
  updateData = (column, tag, index) => {
    this.getImage(column, tag, index)
  }
  render() {
    return (
      <Section>
        <Container>
          <Columns>
            <Columns.Column>
              <DiscoverColumn column={'column1'}
                              image={this.state.column1.image}
                              data={this.state.column1.data}
                              updateData={this.updateData}
                              updateGallery={this.props.updateGallery}/>
            </Columns.Column>
            <Columns.Column>
              <DiscoverColumn column={'column2'}
                              image={this.state.column2.image}
                              data={this.state.column2.data}
                              updateData={this.updateData}
                              updateGallery={this.props.updateGallery}/>
            </Columns.Column>
            <Columns.Column>
              <DiscoverColumn column={'column3'}
                              image={this.state.column3.image}
                              data={this.state.column3.data}
                              updateData={this.updateData}
                              updateGallery={this.props.updateGallery}/>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  updateGallery: (data) => dispatch({type: 'UPDATE_GALLERY', data: data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
