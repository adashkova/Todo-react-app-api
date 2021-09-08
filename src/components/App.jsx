import { useState, useEffect, useCallback } from 'react';
import Input from './Input';
import TodoItems from './TodoItems';
import FilterItems from './FilterItems';
import Button from './Button';

import '../styles/app.css';
require('dotenv').config();

function App() {
  // State
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const [filters, setFilters] = useState([
    { id: 1, text: 'All', isActiveClass: true },
    { id: 2, text: 'Completed', isActiveClass: false },
    { id: 3, text: 'In Progress', isActiveClass: false },
  ]);

  let apiKey = process.env.REACT_APP_API_KEY;

  const baseUrl = 'https://exceed-todo-list.herokuapp.com/api/v1';

  // create todo item
  const createTodos = async todo => {
    const headers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
      body: JSON.stringify(todo),
    };
    const response = await fetch(`${baseUrl}/todos`, headers);

    const result = await response.json(todo);
  };
  // add todo

  const addTodo = () => {
    if (inputValue) {
      const newTodo = { title: inputValue };
      createTodos(newTodo);
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setInputValue('');
    } else {
      alert('Please input text');
    }
  };

  // Filtration

  const doFiltration = filterId => {
    const newFilters = filters.map(item => {
      if (item.id === filterId) {
        return {
          ...item,
          isActiveClass: !item.isActiveClass,
        };
      }

      return {
        ...item,
        isActiveClass: false,
      };
    });

    setFilters(newFilters);
  };

  useCallback(() => {
    doFiltration();
  }, []);

  const markTodo = async id => {
    const headers = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
    };
    let response = await fetch(`${baseUrl}/todos/${id}/done`, headers);
    let result = await response.json();
    console.log(result);
    getData();
  };

  // remove todo

  const removeTodo = async id => {
    const confirm = window.confirm('Delete this todo?');
    if (confirm) {
      const headers = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
        },
      };
      let response = await fetch(`${baseUrl}/todos/${id}`, headers);
      let result = await response.json();
      console.log(result);
      getData();
    } else {
      return;
    }
  };

  // Clear All Done
  const deleteAllTodo = async () => {
    const confirm = window.confirm('Delete All Done todo?');
    if (confirm) {
      const headers = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
        },
      };
      let response = await fetch(`${baseUrl}/todos/clear-done`, headers);
      let result = await response.json();

      getData();
    } else {
      return;
    }
  };

  // Get data

  const getData = async () => {
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
    };
    await fetch(`${baseUrl}/todos`, headers)
      .then(res => res.json())
      .then(
        result => {
          setTodos(result);
        },
        error => {
          alert('error', error);
        }
      );
  };

  useEffect(() => {
    getData();
  }, []);

  //// render
  return (
    <div className="App">
      <div className="container">
        <h1>ToDos</h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo();
          }}
          className="todo_form"
        >
          <Input
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
          <Button type="submit" text="Add" />
        </form>

        <TodoItems
          todos={todos}
          markTodo={markTodo}
          removeTodo={removeTodo}
          activeFilter={filters.find(item => item.isActiveClass)}
        />

        <FilterItems
          deleteAllTodo={deleteAllTodo}
          doFiltration={doFiltration}
          filters={filters}
        />
      </div>
    </div>
  );
}

export default App;
