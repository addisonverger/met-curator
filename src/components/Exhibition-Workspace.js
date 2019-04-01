import React, { Component } from 'react';
import interact from 'interactjs'
import Resizable from 're-resizable'

import { Image } from 'react-bulma-components/full'

// Interactjs

// target elements with the "draggable" class
function interactJS() {
  interact('.draggable')
    .draggable({
      origin: { x: 0, y: 0 },
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

        let exhibition = this.props.exhibition
        let objectID = this.state.selectedImageID

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        this.props.updateExhibitionImageCoordinates(exhibition, objectID, x, y)
      }
    })

   //  .resizable({
   //   // resize from all edges and corners
   //   edges: { left: true, right: true, bottom: true, top: true },
   //
   //   modifiers: [
   //     // keep the edges inside the parent
   //     interact.modifiers.restrictEdges({
   //       outer: 'parent',
   //       endOnly: true,
   //     }),
   //
   //     // minimum size
   //     interact.modifiers.restrictSize({
   //       min: { width: 100, height: 50 },
   //     }),
   //   ],
   //
   //   inertia: true
   // })
   // .on('resizemove', function (event) {
   //   var target = event.target,
   //       x = (parseFloat(target.getAttribute('data-x')) || 0),
   //       y = (parseFloat(target.getAttribute('data-y')) || 0);
   //
   //   // update the element's style
   //   target.style.width  = event.rect.width + 'px';
   //   target.style.height = event.rect.height + 'px';
   //
   //   // translate when resizing from top or left edges
   //   x += event.deltaRect.left;
   //   y += event.deltaRect.top;
   //
   //   target.style.webkitTransform = target.style.transform =
   //       'translate(' + x + 'px,' + y + 'px)';
   //
   //   target.setAttribute('data-x', x);
   //   target.setAttribute('data-y', y);
   //   target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
   // });

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
      selectedImageID: ''
    }
    this.interactJS = interactJS.bind(this)
    this.interactJS()
  }
  handleImageClick(objectID) {
    this.setState({
      selectedImageID: objectID
    })
  }
  render() {
    return (
      <Resizable className="exhibitionBox"
                defaultSize={{width: '100%', height: 800}}
                minHeight={800}
                enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
        {this.props.index !== -1 ?
        this.props.exhibitions[this.props.index].objects.map((element, index) => {
          let newStyle = {position: 'absolute', transform: `translate(${element.x}px, ${element.y}px)`}
          return (
            <Image key={index}
                    className="draggable"
                    style={newStyle}
                    src={element.primaryImageSmall}
                    onMouseDown={() => this.handleImageClick(element.objectID)}/>
          )
        }) : ''}
      </Resizable>
    );
  }
}

export default ExhibitionWorkspace;
