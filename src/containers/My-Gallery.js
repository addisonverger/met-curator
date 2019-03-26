import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuuriGrid from 'react-muuri'

import ImageModal from '../components/Image-Modal.js'
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
  // componentWillUnmount () {
  //   this.grid.getMethod('destroy');
  // }
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
                    <div className={item.isSelected ? "item-content selected" : "item-content"}
                        onClick={() => this.props.selectImage(index)}>
                      <Image src={item.data.primaryImage}/>
                      <ImageModal data={this.props.gallery[index].data}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
        {this.props.gallery.find((element) => {return element.isSelected === true}) !== undefined ?
        <GalleryFooter moveExhibition={this.props.moveExhibition}
                      addExhibition={this.props.addExhibition}
                      removeImage={this.props.removeImage}
                      exhibitions={this.props.exhibitions}/> : '' }
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  exhibitions: state.exhibitions
})

const mapDispatchToProps = (dispatch) => ({
  selectImage: (index) => dispatch({type: 'SELECT_IMAGE', index: index}),
  moveExhibition: (title) => dispatch({type: 'MOVE_EXHIBITION', title: title}),
  addExhibition: (title) => dispatch({type: 'ADD_EXHIBITION', title: title}),
  removeImage: () => dispatch({type: 'REMOVE_IMAGE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
