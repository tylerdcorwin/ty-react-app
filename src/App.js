import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
//node module that generates unique ids on the fly, using version 4 (v4)
// import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos: [
      //Make a empty array to use the HTML fetch using axios
      // {
      //   id: uuid.v4(),
      //   title: 'Take out the trash',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Give the kids a bath',
      //   completed: true
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Dinner with Wife',
      //   completed: false
      // },
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  //toggles todo completed state
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        //works like a toggle
        todo.completed = !todo.completed
      }
      return todo;
    }) })
  }

  //Delete todo
  deleteTodo = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //Add Todo
  addTodo = (title) => {
    // console.log(title)

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
