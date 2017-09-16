import React, { Component } from 'react';
import axios from 'axios';
import UserList from './UserList';
import ThingsList from './ThingList';
import Home from './Home';

class App extends Component{
  constructor() {
    super();
    this.state = {
      users: [],
      things: []
    };
  }

  componentDidMount() {
    Promise.all([
        axios.get('/api/users'),
        axios.get('/api/things'),
      ])
      .then(([ users, things ]) => {
        this.setState({
          users: users.data,
          things: things.data
        });
      })
  }

  render() {
    const { users, things } = this.state;

    return (
       <div className="container">
        <h1>Users and Things</h1>
        <h2>{ users.length }</h2>
        <h2>{ things.length }</h2>
       </div>
    )
  }
}

export default App;
