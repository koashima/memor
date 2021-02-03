import React, { useCallback } from 'react';
import TodoItem from './types/TodoItem';
import { gql, useMutation } from '@apollo/client';

const TOGGLE_TODO_ITEM = gql`
  mutation($id: ID!) {
    toggleTodoItem(id: $id) {
      id
      isCompleted
    }
  }
`;
const TodoListItem = ({ id, content, isCompleted }: TodoItem) => {
  const [toggleItem] = useMutation(TOGGLE_TODO_ITEM);
  const handleToggle = useCallback(() => {
    toggleItem({ variables: { id } });
  }, [id, toggleItem]);

  return (
    <div className="todo_item">
      <button
        className={`todo_item__toggle ${
          isCompleted ? 'todo_item__toggle--completed' : ''
        }`}
        onClick={handleToggle}
      />
      <p className="todo_item__content ">{content}</p>
    </div>
  );
};

export default TodoListItem;
