import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {
          users.map(user => {
            return (
              <li className="list-group-item" key={ user.id }>{ user.name }</li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default UserList;
