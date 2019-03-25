import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuuriGrid from 'react-muuri'

import GalleryFooter from '../components/Gallery-Footer.js'

import { Section, Container, Image } from 'react-bulma-components/full'

class MyGallery extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount () {
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        // dragEnabled: true,
        // layout: {
        //   fillGaps: true
        // },
        layoutOnResize: true
      },
    });
  }
  componentWillUnmount () {
    this.grid.getMethod('destroy');
  }
  render() {
    console.log(this.state)
    return (
      <Section>
        <Container>
          <div>
            <div className="grid" ref={gridElement => this.gridElement = gridElement}>
              {this.props.gallery.map((item, index) => {
                return (
                  <div className="item"
                        key={index}>
                    <div className={item.isSelected ? "item-content selected" : "item-content"}
                        onClick={() => this.props.selectImage(index)}>
                      <Image src={item.data.primaryImage}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
        {this.props.gallery.find((element) => {return element.isSelected === true}) !== undefined ?
        <GalleryFooter removeImage={this.props.removeImage}/> : '' }
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery
})

const mapDispatchToProps = (dispatch) => ({
  selectImage: (index) => dispatch({type: 'SELECT_IMAGE', index: index}),
  removeImage: () => dispatch({type: 'REMOVE_IMAGE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
