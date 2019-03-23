import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuuriGrid from 'react-muuri'

import { Section, Container, Image } from 'react-bulma-components/full'

class MyGallery extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount () {
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true,
        layout: {
          fillGaps: true
        },
        layoutOnResize: true
      },
    });
  }
  componentWillUnmount () {
    this.grid.getMethod('destroy');
  }
  render() {
    return (
      <Section>
        <Container>
          <div>
            <div className="grid" ref={gridElement => this.gridElement = gridElement}>
              {this.props.gallery.map((item, index) => {
                return (
                  <div className="item"
                        key={index}>
                    <div className="item-content">
                      <Image src={item.primaryImage}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
