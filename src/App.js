import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h2>app.js</h2>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/diary/:id" element={<Diary />} />
                    // colon을 통해 id값을 전달 할 수있다. 대신 id를 무조건 받는
                    형식이다
                </Routes>
                <RouteTest />
            </div>
        </BrowserRouter>
    );
}

export default App;
