import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchCards, loginAction } from './store/actions/card-actions';
import { ThunkAppDispatch } from './types/card-actions';

(store.dispatch as ThunkAppDispatch)(fetchCards());
(store.dispatch as ThunkAppDispatch)(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store} >
    <App />
  </Provider>
);
