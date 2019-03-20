import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import DiscoverColumn from '../components/Discover-Column.js'

import { Section, Columns } from 'react-bulma-components/full'

class Discover extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')
    .then((response) => {
      console.log(response)
      let objectID = response.data.objectIDs[0]
      axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {console.log(error)})
    })
    .catch((error) => {console.log(error)})
  }
  render() {
    return (
      <Section>
        <Columns>
          <Columns.Column>
            <DiscoverColumn />
          </Columns.Column>
          <Columns.Column>
            <DiscoverColumn />
          </Columns.Column>
          <Columns.Column>
            <DiscoverColumn />
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
