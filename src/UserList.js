import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

class User extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillReceiveProps(props) {
    const { match } = props;
    const { user } = this.state;

    if (user.id && user.id !== match.params.id * 1) {
      axios.get(`/api/users/${ match.params.id }`)
        .then(result => {
          this.setState({ user: result.data });
        })
    }
  }

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/users/${ match.params.id }`)
      .then(result => {
        this.setState({ user: result.data });
      })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="well">
      { user.things === undefined ? null :
        (
          <ul className="list-group">
            {
              user.things.map(thing => {
                return (
                  <li className="list-group-item" key={ thing.id }>{ thing.name }</li>
                )
              })
            }
          </ul>
        )
      }
      </div>
    )
  }
}

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
