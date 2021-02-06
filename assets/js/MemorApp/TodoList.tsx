import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TodoItem from './types/TodoItem';
import TodoListItem from './components/TodoListItem';
import NewTodoButton from './components/NewTodoButton';
import NewTodoForm from './components/NewTodoForm';

interface TodoItemsQueryResults {
  todoItems: TodoItem[];
}

export const GET_TODO_ITEMS = gql`
  {
    todoItems {
      id
      content
      isCompleted
      insertedAt
      updatedAt
    }
  }
`;

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResults>(GET_TODO_ITEMS);
  const [newTodo, setNewTodo] = useState(false);
  return (
    <div className="todo_list">
      <h1>~ memor ~</h1>
      <h2 className="todo_list__header">REMINDERS</h2>
      <div className="todo_list__list">
        {data?.todoItems?.map((item: TodoItem) => (
          <TodoListItem key={item.id} {...item} />
        ))}
        {newTodo ? <NewTodoForm /> : null }
      </div>
      <div className="todo_list__spacer"></div>
      <footer className="todo_list__footer">
        <NewTodoButton onClick={() => setNewTodo(true)}/>
      </footer>
    </div>
  );
};

export default TodoList;
