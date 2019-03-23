import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuuriGrid from 'react-muuri'

import { Section } from 'react-bulma-components/full'

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
        }
      },
    });
  }
  componentWillUnmount () {
    this.grid.getMethod('destroy');
  }
  render() {
    return (
      <Section>
        <div>
          <div className="grid" ref={gridElement => this.gridElement = gridElement}>
            <div className="item box1">
              <div className="item-content">
                Box 1
              </div>
            </div>
            <div className="item box2">
              <div className="item-content">
                Box 2
              </div>
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery)
