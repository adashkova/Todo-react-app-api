import React from 'react';
import Button from './Button';
import IfNoTodos from './IfNoTodos';
import '../styles/todoItems.css';

const TodoItems = ({ todos, markTodo, removeTodo, activeFilter, loading }) => {
  const newTodos = todos.filter(item => {
    if (activeFilter.id === 2) {
      return item.isDone;
    }

    if (activeFilter.id === 3) {
      return !item.isDone;
    }

    return item;
  });

  if (newTodos.length) {
    const todoItems = newTodos.map(item => {
      return (
        <div
          key={`${item.title}${item._id}`}
          className="todo_item"
          style={{ textDecoration: item.isDone ? 'line-through' : '' }}
        >
          <h3 onClick={() => markTodo(item._id)}>{item.title}</h3>
          <Button onClick={() => removeTodo(item._id)} text={'X'}></Button>
        </div>
      );
    });
    return <div className="todo_items">{todoItems}</div>;
  } else {
    return <IfNoTodos />;
  }
};
export default TodoItems;
