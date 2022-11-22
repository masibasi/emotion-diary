import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.filter((it) =>
                it.id === action.data.id ? { ...action.data } : it
            );
            break;
        }
        default:
            return state;
    }
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const DummyData = [
    {
        id: 1,
        emotion: 1,
        content: "오늘의 일기 1번",
        date: new Date().getTime() - 5,
    },
    {
        id: 2,
        emotion: 2,
        content: "오늘의 일기 2번",
        date: new Date().getTime() - 4,
    },
    {
        id: 3,
        emotion: 3,
        content: "오늘의 일기 3번",
        date: new Date().getTime() - 3,
    },
    {
        id: 4,
        emotion: 4,
        content: "오늘의 일기 4번",
        date: new Date().getTime() - 2,
    },
    {
        id: 5,
        emotion: 5,
        content: "오늘의 일기 5번",
        date: new Date().getTime() - 1,
    },
];
function App() {
    const [data, dispatch] = useReducer(reducer, DummyData);

    const dataId = useRef(0);

    //CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };
    //REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };
    //EDIT
    const onEdit = (targetID, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetID,
                date: new Date(date).getTime,
                content,
                emotion,
            },
        });
    };
    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{ onCreate, onEdit, onRemove }}
            >
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/edit" element={<Edit />} />
                            <Route path="/diary/:id" element={<Diary />} />
                            // colon을 통해 id값을 전달 할 수있다. 대신 id를
                            무조건 받는 형식이다
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
