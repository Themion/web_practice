import useFullscreen from "./hooks/useFullscreen";

const App = () => {
    const onFullscreen = (isFull: boolean) => {
        console.log(isFull)
    }
    const { element, triggerFull, exitFull } = useFullscreen<HTMLImageElement>(onFullscreen)

    return <div className="App" style={{height: '1000vh'}}>
        <img 
            ref={element} 
            onClick={exitFull}
            style={{width: '300px'}} 
            src="img/img.jpg" 
            alt="" />
        <br />
        <button onClick={triggerFull}>Fullscrean</button>
    </div>
}

export default App;
