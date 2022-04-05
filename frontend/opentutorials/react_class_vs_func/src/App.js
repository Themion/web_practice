import './App.css';
import React, {Component, useState, useEffect} from 'react'

function App() {
    var date = Date()

    var [show_func, set_func] = useState(true)
    var [show_class, set_class] = useState(true)

    return (
        <div className="container">
            Hello, World!
            {show_func ? <FuncComp initNUmber={2} date={date} /> : null}
            {show_class ? <ClassComp initNUmber={2} date={date} /> : null}
            <input type="button" value="func" onClick={
                function() {
                    set_func(!show_func)
                    console.log('show_func: ', show_func)
                }
            }></input>
            <input type="button" value="class" onClick={
                function() {
                    set_class(!show_class)
                    console.log('show_class: ', show_class)
                }
            }></input>
        </div>
    );
}

let func_style = 'color:blue',
    class_style = 'color:red'

var func_id = 0, class_id = 0

function FuncComp(props) {
    console.log('%cfunc => render ' + (++func_id), func_style)

    let [num, set_num] = useState(props.initNUmber),
        [date, set_date] = useState(props.date)

    // side effect
    useEffect(function () {
        console.log('%cfunc => useEffect (componentDidMount) ' + (func_id), func_style)
        document.title = num + ': ' + date
        return function() {
            console.log('%cfunc => useEffect return (componentWillUnmount) ' + (func_id++), func_style)
        }
    }, [])

    // side effect
    useEffect(function () {
        console.log('%cfunc => useEffect num (componentDidMount & componentDidUpdate) ' + (func_id), func_style)
        document.title = num + ': ' + date
        return function() {
            console.log('%cfunc => useEffect num return (componentDidMount & componentDidUpdate) ' + (func_id++), func_style)
        }
    }, [num])

    // side effect
    useEffect(function () {
        console.log('%cfunc => useEffect date (componentDidMount & componentDidUpdate) ' + (func_id), func_style)
        document.title = num + ': ' + date
        return function() {
            console.log('%cfunc => useEffect date return (componentDidMount & componentDidUpdate) ' + (func_id++), func_style)
        }
    }, [date])

    return (
        <div className="container">
            <h2>function style component</h2>
            <p>Number: {num}</p>
            <p>Date: {date}</p>
            <input type="button" value="number" onClick={
                function(){ set_num(Math.random()) }
            }></input>
            <input type="button" value="date" onClick={
                function(){ set_date(Date()) }
            }></input>
        </div>
    )
}

class ClassComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number: this.props.initNUmber,
            date: this.props.date
        }
    }
    componentWillMount () {
        console.log('%cclass => componentWillMount', class_style)
    }
    componentDidMount () {
        console.log('%cclass => componentDidMount', class_style)
    }
    render() {
        console.log('%cclass => render ' + (++class_id), class_style)
        return (
            <div className="container">
                <h2>class style component</h2>
                <p>Number: {this.state.number}</p>
                <p>Date: {this.state.date}</p>
                <input type="button" value="number" onClick={
                    function() { 
                        this.setState({number: Math.random()}) 
                    }.bind(this)
                }></input>
                <input type="button" value="date" onClick={
                    function() { 
                        this.setState({date: Date()}) 
                    }.bind(this)
                }></input>
            </div>
        )
    }
}

export default App;
