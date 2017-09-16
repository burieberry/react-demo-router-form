import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ tab, path }) => {
  return (
    <li className={ path === tab.path ? 'active' : null }>
      <Link to={ tab.path }>{ tab.title }</Link>
    </li>
  )
}

const Nav = ({ location }) => {
  const path = location.pathname;
  const tabs = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Things',
      path: '/things'
    },
    {
      title: 'Users',
      path: '/users'
    }
  ];

  return (
    <ul className="nav nav-tabs" style={{ marginBottom: '10px' }}>
      {
        tabs.map(tab => <Tab key={ tab.path } tab={ tab } path={ path } />)
      }
    </ul>
  );
}

export default Nav;
