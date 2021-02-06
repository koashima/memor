import React from 'react';
import PlusIcon from './PlusIcon';

const NewTodoButton = () => {
  return (
    <div className="todo_list__footer">
      <button className="new_todo_button">
        <span className="new_todo_button__icon">
          <PlusIcon />
        </span>
      new reminder</button>
    </div>
  );
};

export default NewTodoButton;
