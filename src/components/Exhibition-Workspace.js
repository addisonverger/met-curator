import React, { Component } from 'react';
import interact from 'interactjs'
import Resizable from 're-resizable'

import { Image } from 'react-bulma-components/full'

// Interactjs

// target elements with the "draggable" class
function interactJS() {
  interact('.draggable')
    .draggable({
      origin: 'parent',
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrict({
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: (event) => {
        var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        this.handleUpdateImageCoordinates(x, y)
      }
    })

    function dragMoveListener (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
}

class ExhibitionWorkspace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageIndex: ''
    }
    this.interactJS = interactJS.bind(this)
    this.interactJS()
  }
  handleUpdateImageCoordinates(x, y) {
    let exhibition = this.props.currentExhibition.title
    let objectIndex = this.state.selectedImageIndex
    console.log(exhibition, objectIndex, x, y)
    this.props.updateExhibitionImageCoordinates(exhibition, objectIndex, x, y)
  }
  handleImageClick(index) {
    this.setState({
      selectedImageIndex: index
    })
  }
  render() {
    return (
      <Resizable className="exhibitionBox"
                defaultSize={{width: '100%', height: 800}}
                minHeight={800}
                enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
        {this.props.index !== -1 ?
        this.props.currentExhibition.objects.map((element, index) => {
          let newStyle = {position: 'absolute', transform: `translate(${element.x}px, ${element.y}px)`}
          return (
            <Image key={index}
                    className="draggable"
                    style={newStyle}
                    data-x={element.x}
                    data-y={element.y}
                    src={element.primaryImageSmall}
                    onMouseDown={() => this.handleImageClick(index)}/>
          )
        }) : ''}
      </Resizable>
    );
  }
}

export default ExhibitionWorkspace;
