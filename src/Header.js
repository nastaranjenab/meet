import React from 'react'
import {Container, Navbar} from 'react-bootstrap'
import {BsFillPeopleFill} from 'react-icons/bs'

function Header() {
  return (
    <Navbar>
    <Container>
      <div className="header">
        <BsFillPeopleFill />{' '}
          Meetup App - Meet other people while learning what you love!
      </div>
    </Container>
  </Navbar>
  )
}

export default Header

