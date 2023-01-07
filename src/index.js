import React from 'react';
import ReactDOM from 'react-dom/client';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// my comps
import { LS_TOKEN_KEY } from './components/consts/consts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const token = JSON.parse(window.localStorage.getItem(LS_TOKEN_KEY));

// default redux state
const defaultState = {
	token, 
	cart: [], 
}

// redux reducer
const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			window.localStorage.setItem( LS_TOKEN_KEY, JSON.stringify(action.token) );
			return {...state, token: action.token}
		case 'REMOVE_TOKEN':
			return {...state, token: null}
		default:
			return state;
		}
	}
	
// redux store
const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
