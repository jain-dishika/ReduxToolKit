import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <>
      <Navbar bg="danger" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{'color': 'white'}}>Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='navButton'>UserList</NavLink>
            <NavLink to='/AddUser'className='navButton'>AddUser</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
