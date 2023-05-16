import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import {  fetchCards, fetchCheckAuth } from './store/actions/card-actions';
import { ThunkAppDispatch } from './types/card-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchCheckAuth());
(store.dispatch as ThunkAppDispatch)(fetchCards());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store} >
    <App />
    <ToastContainer />
  </Provider>
);
