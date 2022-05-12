import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { todoStore } from './app/TodoStore';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={todoStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
