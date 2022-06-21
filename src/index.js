import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from "redux-devtools-extension";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./firebase";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const store = createStore(rootReducer);
console.log("Process.env" + process.env.REACT_APP_FIREBASE_API_KEY);
const rrfProps = {
  firebase,
  config: {
        userProfile: "users"
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

store.subscribe(() =>
  console.log(store.getState())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
  </Provider>,
);
