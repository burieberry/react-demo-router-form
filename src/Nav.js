import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ tab }) => {
  return (
    <li>
      <Link to={ tab.path }>{ tab.title }</Link>
    </li>
  )
}

const Nav = () => {
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
    <ul className="nav nav-tabs">
      {
        tabs.map(tab => <Tab key={ tab.path } tab={ tab } />)
      }
    </ul>
  );
}

export default Nav;
