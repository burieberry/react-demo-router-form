import React from 'react';

const Tab = ({ tab }) => {
  return (
    <li>
      <a href={ tab.path }>{ tab.title }</a>
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
