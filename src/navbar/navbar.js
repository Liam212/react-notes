import React from 'react';
import { Link } from 'react-router-dom'
import brand from './brand.png'
import './navbar.css'
import { Navbar, Nav, NavItem, NavLink } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default () => (
  
      <Navbar type="light" theme="light" expand="md">
        <Nav>
          <Link to='/notes'>
            <h5 style={{marginTop: 2 + 'pt', textDecoration: 'none'}}><img src={brand} height="30" width="30" alt="logo" style={{marginRight: 5 + 'pt'}}/>Clotes</h5>
          </Link>
          <NavItem>
            <NavLink disabled href="about">
              About Clotes
            </NavLink>
          </NavItem>  
        </Nav>
      </Navbar>
)

