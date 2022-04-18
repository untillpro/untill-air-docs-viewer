import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { CookiesProvider } from 'react-cookie';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';

import reducers from 'reducers/index.js';

import 'typeface-roboto'; // roboto font

import 'assets/index.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render((
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider> 
), document.getElementById('root'));
