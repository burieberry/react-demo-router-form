import React, { Component } from 'react';
import axios from 'axios';

class User extends Component{
  constructor() {
    super();
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
      <h4>Details:</h4>
      { user.user_things === undefined || user.user_things.length === 0 ?
        ( `${ user.name } has nothing.` ) :
        (
          <ul className="list-group">
            {
              user.user_things.map(userThing => {
                return (
                  <li className="list-group-item" key={ userThing.id }>{ userThing.thing.name }</li>
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

export default User;
