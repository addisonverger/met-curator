import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Section, Container } from 'react-bulma-components/full'

class MyExhibitions extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Section>
        <Container>
          This is my exhibitions
        </Container>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MyExhibitions)
