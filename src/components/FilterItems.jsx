import React from 'react';
import Button from './Button';
import '../styles/filterItems.css';

const FilterItems = ({ deleteAllTodo, doFiltration, filters }) => {
  const filterItems = filters.map(item => (
    <p
      onClick={() => doFiltration(item.id)}
      key={`${item.text}${item._id}`}
      className={item.isActiveClass ? 'active' : ''}
    >
      {item.text}
    </p>
  ));

  return (
    <div className="filters">
      {filterItems}
      <Button clearAll={() => deleteAllTodo()} text="Clear Done" />
    </div>
  );
};

export default FilterItems;
