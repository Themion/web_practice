// import { useState } from "react";

const App = () => {
  // This will not work: RSC will not be hydrated!
  // const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello Next.js!</h1>
      {/* <button onClick={() => setCount((c) => c + 1)}>{count}</button> */}
    </>
  );
};

export default App;
