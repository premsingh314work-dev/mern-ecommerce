import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen">
      <div className="h-[9%]">
      <Navbar/>
      </div>
      <div className="h-auto w-screen">
      <Body/>
      </div>
      <div className="h-">

      </div>
    </div>
    

  );
}

export default App;
