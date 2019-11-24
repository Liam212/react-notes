import React from 'react';
import { Link } from 'react-router-dom'
import brand from './brand.png'
import './navbar.css'
import { 
  Navbar,
  NavbarBrand
  
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default () => (
  
      <Navbar type="light" theme="light" expand="md">
      <div>
      <Link to='/notes'>
          <img src={brand} height="30" width="30" alt="logo" style={{marginRight: 5 + 'pt'}}/>
        </Link>
        <NavbarBrand>Clotes</NavbarBrand>
      </div>
      </Navbar>
)

