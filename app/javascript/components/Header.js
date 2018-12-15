import React, { Fragment } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from './About'
import TradingHistory from './TradingHistory'
import Home from './Home'
import Stocks from './Stocks'

class Header extends React.Component {
  render() {
    return(
      <Router>
        <Fragment>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                <span className="glyphicon glyphicon-equalizer"></span>
                Investment Monitor
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/trading_history">
                  <NavItem>Trading History</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem>About</NavItem>
                </LinkContainer>
                <LinkContainer to="/stocks">
                  <NavItem>Stocks</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/trading_history" component={TradingHistory} />
            <Route path="/about" component={About} />
            <Route path="/stocks" component={Stocks} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default Header;