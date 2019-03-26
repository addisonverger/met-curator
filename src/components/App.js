import React, { Component } from 'react';
import Discover from '../containers/Discover.js'
import MyGallery from '../containers/My-Gallery.js'
import MyExhibitions from '../containers/My-Exhibitions.js'

import { Section, Container, Level, Tabs, Heading } from 'react-bulma-components/full'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'discover',
      isActive: 0
    }
  }
  openTab = (currentTab) => {
    const contents = {
      'discover': 0,
      'my-gallery': 1,
      'my-exhibitions': 2
    }
    this.setState({
      currentTab: currentTab,
      isActive: contents[currentTab]
    })
  }
  render() {
    const contents = {
      'discover': <Discover />,
      'my-gallery': <MyGallery />,
      'my-exhibitions': <MyExhibitions />
    }
    return (
      <div>
        <Section>
          <Container>
            <Level>
              <Level.Side align='left'>
                <Level.Item>
                  <Heading size={2}>Met Curator</Heading>
                </Level.Item>
              </Level.Side>
              <Level.Side align='right'>
                <Level.Item>
                  <a href="#">Login</a>
                </Level.Item>
              </Level.Side>
            </Level>
          </Container>
        </Section>
        <Container>
          <Tabs type='boxed'>
            <Tabs.Tab className={this.state.isActive === 0 ? 'is-active' : ''}
                      onClick={() => this.openTab('discover')}>
              Discover
            </Tabs.Tab>
            <Tabs.Tab className={this.state.isActive === 1 ? 'is-active' : ''}
                      onClick={() => this.openTab('my-gallery')}>
              My Gallery
            </Tabs.Tab>
            <Tabs.Tab className={this.state.isActive === 2 ? 'is-active' : ''}
                      onClick={() => this.openTab('my-exhibitions')}>
              My Exhibitions
            </Tabs.Tab>
          </Tabs>
        </Container>
        { contents[this.state.currentTab] }
      </div>
    );
  }
}

export default App;
