import React, { Fragment } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from './About'
import Monitor from './Monitor'
import Home from './Home'

class Header extends React.Component {
  render() {
    return(
      <Router>
        <Fragment>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Investment Monitor</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/monitor">
                  <NavItem>Monitor</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem>About</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/monitor" component={Monitor} />
            <Route path="/about" component={About} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default Header;