import React, { Component } from 'react'

import { Form, Image, Button } from 'react-bulma-components/full'

const DiscoverColumn = () => {
  return (
    <div>
      <Form.Field>
        <Form.Control>
          <Form.Select className='is-fullwidth'>
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
          </Form.Select>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Image src='https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/quick-and-simple-image-placeholders/bcohuFwnmPgIu4aM56YZudq12m02'
              size='1by1' />
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button outlined fullwidth>
            New
          </Button>
        </Form.Control>
      </Form.Field>
    </div>
  )
}

export default DiscoverColumn
