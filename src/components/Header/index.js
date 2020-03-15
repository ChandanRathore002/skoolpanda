import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap';

import './header.scss';
import Logo from '../../images/logo.png'

const Header = () => {
  const version = '{process.env.REACT_APP_GIT_VERSION}';
  return(
    <Navbar collapseOnSelect fixed="top" bg="light" expand="lg">
      <Navbar.Brand href="/home">
        <img width="80" src={Logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-5 custom-hover">
            <Nav.Link href="/schools">Schools</Nav.Link>
            <Nav.Link href="/staff">Staffs</Nav.Link>
            <Nav.Link href="/student/leave-apply">Students</Nav.Link>
            <Nav.Link href="/people" className="">People</Nav.Link>
            <NavDropdown title="Masters" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/role">Roles</NavDropdown.Item>
              <NavDropdown.Item href="/action">Action 2</NavDropdown.Item>
              <NavDropdown.Item className="submenu-dropdown" href="#action/3.3">
                Sub Menu
                <ul>
                  <li>
                    <Link to="/demo">Demo 1</Link>
                  </li>
                  <li>
                    <Link to="/demo">Demo 2</Link>
                  </li>
                </ul>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="version-col">
            Version: <span>{version}</span>
          </div>
          <Nav className="account-dropdown">
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
