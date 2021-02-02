import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface TodoItem {
  id: number | string;
  content: string;
  isCompleted: boolean;
}

interface TodoItemsQueryResults {
  todoItems: TodoItem[];
}

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResults>(gql`
    {
      todoItems {
        id
        content
        isCompleted
      }
    }
  `);

  return (
    <div className="todo_list">
      <h2 className="todo_list__header">TODO ITEMS</h2>
      <ul className="todo_list__list">
        {data?.todoItems
          ? data.todoItems.map((item) => (
              <li
                key={item.id}
                className={
                  item.isCompleted
                    ? 'todo_list__item todo_list__item--completed'
                    : 'todo_list__item'
                }
              >
                {item.content}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TodoList;
