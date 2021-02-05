import React from 'react';
import { gql, useQuery } from '@apollo/client';
import TodoItem from './types/TodoItem';
import TodoListItem from './components/TodoListItem';
import NewTodoButton from './components/NewTodoButton';
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

  return (
    <div className="todo_list">
      <h2 className="todo_list__header">TODOS</h2>
      <div className="todo_list__list">
        {data?.todoItems?.map((item: TodoItem) => (
          <TodoListItem key={item.id} {...item} />
        ))}
      </div>
      <div className="todo_list__footer">
        <NewTodoButton />
      </div>
    </div>
  );
};

export default TodoList;
