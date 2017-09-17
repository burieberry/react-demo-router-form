import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import User from './User';

const UserItem = ({ user }) => {
  return (
    <li className="list-group-item">
      <Link to={ `/users/${ user.id }` }>
        { user.name }
      </Link>
    </li>
  );
};

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Route path="/users/:id" component={ User } />
      <ul className="list-group">
        {
          users.map(user => {
            return (
              <UserItem key={ user.id }  user={ user } />
            )
          })
        }
      </ul>
    </div>
  );
};

export default UserList;
