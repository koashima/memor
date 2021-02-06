import React, { FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_TODO_ITEMS } from '../TodoList';

const NewTodoForm = () => {
  const CREATE_TODO_ITEM = gql`
    mutation createTodoItem($content: String!) {
      createTodoItem(content: $content) {
        id
        isCompleted
        content
      }
    }
  `;

  const [content, setContent] = useState('');
  const [createTodo] = useMutation(CREATE_TODO_ITEM, {
    update(cache, { data: { createTodoItem: newTodo } }) {
      const { todoItems } = cache.readQuery({ query: GET_TODO_ITEMS });
      cache.writeQuery({
        query: GET_TODO_ITEMS,
        data: {
          todoItems: [...todoItems, newTodo],
        },
      });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      createTodo({ variables: { content: content.trim() } });
      setContent('')
    }
  };
  return (
    <form className="todo_item new_todo_item" onSubmit={onSubmit}>
      <button className="todo_item__toggle"></button>
      <input
        className="todo_item__content"
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        autoFocus
      />
    </form>
  );
};

export default NewTodoForm;
