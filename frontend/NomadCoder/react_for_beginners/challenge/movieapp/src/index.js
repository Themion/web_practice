import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Home from "./routes/Home"
import Detail from "./routes/Detail"

ReactDOM.render(
    <React.StrictMode>
        <Router><Routes>
            <Route path="/web_practice/movie/:id" element={<Detail />} />
            <Route path="/web_practice" element={<Home />} />
            <Route path="*" element={<Navigate to="/web_practice" />} />
        </Routes></Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
