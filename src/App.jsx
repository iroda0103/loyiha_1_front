import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

function App() {
  return (
    <div className="container">
      <Routes path="/">
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/rooms/:id" element={<About/>}></Route>
        <Route path="/rooms/:id/edit" element={<Edit/>}></Route>
        <Route path="/rooms/create" element={<Create/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
