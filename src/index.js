import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducers/ticket-list-reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
     <App />
  </Provider>,
);
