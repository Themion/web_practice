import { useTabs } from "./hooks/useTabs";
import { Content } from "./types/types";

const contents: Content[] = [
    {
        tab: "Section 1",
        content: "Content of Section 1"
    },
    {
        tab: "Section 2",
        content: "Content of Section 2"
    },
]

const App = () => {
    const {currentItem, changeItem} = useTabs(0, contents)
    return <div className="App">
        {contents.map((section: Content, index: number) => (
            <button onClick={() => changeItem(index)}>
                {section.tab}
            </button>
        ))}
        <div>{currentItem.content}</div>
    </div>
}

export default App;
