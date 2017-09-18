import React, { Component } from 'react';

class UserForm extends Component{
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSave(event) {
    event.preventDefault();
    this.props.onSave(this.state)
      .then(() => this.setState({ name: '' }))
  }

  render() {
    const { name } = this.state;
    const { onNameChange, onSave } = this;
    return (
      <form className="well" onSubmit={ onSave }>
        <div className="form-group">
          <label>Name</label>
          <input onChange={ onNameChange } className="form-control" value={ name } />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    )
  }
}

export default UserForm;
