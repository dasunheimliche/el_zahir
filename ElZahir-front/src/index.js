import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

import './index.css';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Router>
);

