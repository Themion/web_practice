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
        <Router basename={process.env.PUBLIC_URL}><Routes>
            <Route path="/movie/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes></Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
