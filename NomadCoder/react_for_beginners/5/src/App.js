import Button from "./Button.js"
import styles from "./App.module.css"

// App.module.css에서 style을 가져온 뒤
// 마치 객체처럼 활용해 className을 랜덤으로 생성하여
// 같은 이름의 클래스라도 중복되는 것을 막는다
// .module.css인 이유는 CSS module behavior를 막기 위해?

function App() {
    return (
        <div className="App">
            <h1 className={styles.title}>Welcome!</h1>
            <Button text="hi" />
        </div>
    );
}

export default App;
