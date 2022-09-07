import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
} from "react-router-dom"

function Home() {
    console.log("Home")
    return (
        <div>
            <h2>Home</h2>
            Home...
        </div>
    )
}

var contents = [
    { id:1, title:'HTML', desc:'HTML is ...' },
    { id:2, title:'JS', desc:'JS is ...' },
    { id:3, title:'React', desc:'React is ...' }
]

function Topic() {
    let params = useParams()
    var content = contents.filter(function (object) {
        return object.id === Number(params.id)
    })[0]

    if (content === undefined) 
        content = { id: 0, title: 'Sorry', desc: 'Not Found' }

    console.log(content.title)

    return (
        <div>
            {<h3>{content.title}</h3>}
            {content.desc}
        </div>
    )
}

function Topics() {
    console.log("Topics")
    var ul = []
    contents.forEach(function(content) { ul.push(
        <li key={content.id}><NavLink to={'/topics/' + content.id}>
            {content.title}
        </NavLink></li>
    )})
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                {ul}
            </ul>
            <Switch>
                <Route path="/topics/:id"><Topic></Topic></Route>
                <Route path="/">Not found</Route>
            </Switch>
        </div>
    )
}

function Contact() {
    console.log("Contact")
    return (
        <div>
            <h2>Contact</h2>
            Contact...
        </div>
    )
}

function App() {
    console.log("App")
    return (
        <div className="App">
            <h1>Hello React Router Dom!</h1>
            {/* <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul> */}
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/topics">Topics</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            
            {/* <Route exact path="/"><Home></Home></Route>
            <Route path="/topics"><Topics></Topics></Route>
            <Route path="/contact"><Contact></Contact></Route> */}

            <Switch> {/* 안에 들어간 것들 중 하나만 출력 */}
                <Route exact path="/"><Home></Home></Route>
                <Route path="/topics"><Topics></Topics></Route>
                <Route path="/contact"><Contact></Contact></Route>
                <Route path="/">Not Found</Route> 
                {/* 상위 디렉토리는 하위 디렉토리 아래로 */}
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
