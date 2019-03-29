import React, { Component } from 'react'
import { connect } from 'react-redux'
import interact from 'interactjs'
import Resizable from 're-resizable'
import EdgeScroll from 'edge-scroll'

import { Section, Container, Level, Form, Button, Image } from 'react-bulma-components/full'

// Interactjs

// target elements with the "draggable" class
window.INTERACTABLES = interact('.draggable')
  .draggable({
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
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  })
window.interact = interact
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

//

// const edgeScroll = new EdgeScroll(120, 750)

//

class MyExhibitions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibition: 'select',
      index: -1
    }
  }
  updateExhibition(event) {
    const nextExhibition = event.target.value
    let newIndex = this.props.exhibitions.findIndex((exhibition) => {
      return exhibition.title === nextExhibition
    })
    this.setState({
      exhibition: nextExhibition,
      index: newIndex
    })
  }
  handleRemoveExhibition() {
    this.props.removeExhibition(this.state.exhibition)
    this.setState({
      exhibition: 'select',
      index: -1
    })
  }
  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <Section>
        <Container>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Form.Select value={this.state.exhibition}
                            onChange={(event) => this.updateExhibition(event)}
                            className='is-black'>
                  <option key='0'
                          value='select'>
                    Select an Exhibition
                  </option>
                  {this.props.exhibitions.map((exhibition, index) => {
                    return (
                      <option key={index + 1}
                              value={exhibition.title}>
                        {exhibition.title}
                      </option>
                    )
                  })}
                </Form.Select>
              </Level.Item>
              <Level.Item>
                <Button outlined
                        color='black'
                        type='button'
                        onClick={() => this.handleRemoveExhibition()}>
                  Remove
                </Button>
              </Level.Item>
            </Level.Side>
          </Level>
          <Resizable className="exhibitionBox"
                    defaultSize={{width: '100%', height: 800}}
                    minHeight={800}
                    enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
            {this.state.index !== -1 ?
            this.props.exhibitions[this.state.index].objects.map((element, index) => {
              let randLeft = Math.floor(Math.random() * (700 - 50) ) + 50
              let randTop = Math.floor(Math.random() * (500 - 50) ) + 50
              let newStyle = {position: 'absolute', left: randLeft, top: randTop}
              console.log(newStyle)
              return (
                <Image key={index}
                        className="draggable"
                        style={newStyle}
                        src={element.primaryImageSmall} />
              )
            }) : ''}
          </Resizable>
        </Container>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  exhibitions: state.exhibitions
})

const mapDispatchToProps = (dispatch) => ({
  removeExhibition: (title) => dispatch({type: 'REMOVE_EXHIBITION', title: title})
})

export default connect(mapStateToProps, mapDispatchToProps)(MyExhibitions)
