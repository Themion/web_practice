// import { useState } from "react";
import Navigation from "../components/navigation";

const App = () => {
  // This will not work: RSC will not be hydrated!
  // const [count, setCount] = useState(0);
  return (
    <>
      <Navigation />
      <h1>Hello Next.js!</h1>
      {/* <button onClick={() => setCount((c) => c + 1)}>{count}</button> */}
    </>
  );
};

export default App;
