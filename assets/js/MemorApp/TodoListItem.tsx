import React, { ChangeEvent, useCallback, useState } from 'react';
import TodoItem from './types/TodoItem';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TODO_ITEM = gql`
  mutation updateTodoItem($id: ID!, $content: String!) {
    updateTodoItem(id: $id, content: $content) {
      id
      content
    }
  }
`;
const TOGGLE_TODO_ITEM = gql`
  mutation($id: ID!) {
    toggleTodoItem(id: $id) {
      id
      isCompleted
    }
  }
`;

const TodoListItem = ({ id, content, isCompleted, insertedAt }: TodoItem) => {
  const [itemText, setItemText] = useState(content);

  const [toggleItem] = useMutation(TOGGLE_TODO_ITEM);
  const [updateItem] = useMutation(UPDATE_TODO_ITEM);

  const handleToggle = useCallback(() => {
    toggleItem({ variables: { id } });
  }, [id, toggleItem]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setItemText(newText);
    },
    [setItemText]
  );

  const onBlur = useCallback(() => {
    updateItem({ variables: { id, content: itemText } });
  }, [itemText, updateItem]);

  return (
    <div className="todo_item">
      <button
        className={`todo_item__toggle ${
          isCompleted ? 'todo_item__toggle--completed' : ''
        }`}
        onClick={handleToggle}
      />
      <small className="todo_item__timestamp">{insertedAt}</small>
      <input
        className="todo_item__content "
        value={itemText}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TodoListItem;
