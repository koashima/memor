import React from 'react';
import client from './client';
import { ApolloProvider } from '@apollo/client';
import TodoList from './TodoList';

const MemorApp = () => {
  return (
    <ApolloProvider client={client}>
      <h1>MEMOR APP</h1>
      <TodoList />
    </ApolloProvider>
  );
};

export default MemorApp;
