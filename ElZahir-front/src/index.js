// DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom'

// COMPONENTS
import App from './App';

// STORE
import store from './store'

// CSS
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

