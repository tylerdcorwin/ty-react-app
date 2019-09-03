import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {

  /* this function works like inline style sheets.  You have to use camelCase for
  each of the styles, but you can incorporate if statements (as seen below) to
  trigger differnet styles for different prop objects states.  */
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px dotted $ccc',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    }
  }


  render() {
    //this removes the need to keep using { this.props.todo.title } for each call to the props
    const { id, title } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
        <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
        { title }
        <button onClick={this.props.deleteTodo.bind(this, id)} style={btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

//PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default TodoItem
