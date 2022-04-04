import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Board from "./Components/Screens/Board";
import { Layout } from "./Components/Layout";

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Activity />} /> */}
          <Route path="board" element={<Board />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;