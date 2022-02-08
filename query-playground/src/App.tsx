import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import PaginatedResource from './PaginatedResource';

function App() {
  const client = new QueryClient()
  
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <PaginatedResource />
      </QueryClientProvider>
    </div>
  );
}

export default App;
