import React from 'react';
import { NavLink } from 'react-router-dom';
import Tab from './Tab';

export default function Header() {
  return (
    <div className='tabs'>
      <Tab>
        <NavLink activeClassName='is-active' to='/' exact>
          Home
        </NavLink>
      </Tab>
      <Tab>
        <NavLink activeClassName='is-active' to='/about'>
          About
        </NavLink>
      </Tab>
      <Tab>
        <NavLink activeClassName='is-active' to='/features'>
          Features
        </NavLink>
      </Tab>
    </div>
  );
}
