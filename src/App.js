import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Board from "./Components/Board";

export function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="board" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;