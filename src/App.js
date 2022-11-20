import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <MyHeader
                    headText={"app.js"}
                    leftChild={<MyButton text={"왼쪽 버튼"} />}
                    rightChild={<MyButton text={"오른쪽 버튼"} />}
                />
                <h2>app.js</h2>
                <MyButton text="hi" type="POSITIVE" />
                <MyButton text="hi" type="NEGATIVE" />
                <MyButton />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/diary/:id" element={<Diary />} />
                    // colon을 통해 id값을 전달 할 수있다. 대신 id를 무조건 받는
                    형식이다
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
