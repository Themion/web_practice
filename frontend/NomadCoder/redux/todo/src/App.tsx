import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { Detail } from "./routes/Detail"
import Home from "./routes/Home"

export const App = () => {
    return (
        <div className="App container">
            <Router><Routes>
                <Route path="/:id" element={<Detail />} />
                <Route path="/" element={<Home />} />
                <Route path="/" element={<Navigate to='/' />} />
            </Routes></Router>
        </div>
    )
}
