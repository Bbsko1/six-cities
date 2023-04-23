import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import cards from './mock/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <App cards={cards} />
);
