import { useClick } from "./hooks/useClick";
import { OnMouseEvent } from "./types/types";

const App = () => {
    const onClick: OnMouseEvent = () => {
        console.log("debug")
    }

    const title = useClick<HTMLHeadingElement>(onClick)

    return <div className="App">
        <h1 ref={title}>Hello</h1>
    </div>
}

export default App;
