import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import DiscoverColumn from '../components/Discover-Column.js'

import { Section, Columns } from 'react-bulma-components/full'

class Discover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column1: {
        tag: 'sunflowers',
        image: ''
      },
      column2: {
        tag: 'sunflowers',
        image: ''
      },
      column3: {
        tag: 'sunflowers',
        image: ''
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
        this.setState({
          [column]: {
            tag: tag,
            image: image
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
    console.log(this.state)
    return (
      <Section>
        <Columns>
          <Columns.Column>
            <DiscoverColumn column={'column1'}
                            image={this.state.column1.image}
                            updateData={this.updateData}/>
          </Columns.Column>
          <Columns.Column>
            <DiscoverColumn column={'column2'}
                            image={this.state.column2.image}
                            updateData={this.updateData}/>
          </Columns.Column>
          <Columns.Column>
            <DiscoverColumn column={'column3'}
                            image={this.state.column3.image}
                            updateData={this.updateData}/>
          </Columns.Column>
        </Columns>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
