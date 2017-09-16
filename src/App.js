import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList';
import ThingList from './ThingList';
import Home from './Home';
import Nav from './Nav';

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
        <Route render={ (router) => <Nav users={ users } things={ things } router={ router } /> } />
        <Route exact path="/" component={ Home } />
        <Route path="/users" render={ () => <UserList users={ users } /> } />
        <Route exact path="/things" render={ () => <ThingList things={ things } /> } />
       </div>
    );
  }
}

export default App;
