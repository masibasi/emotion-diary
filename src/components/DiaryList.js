import React, { useState } from "react";
import Diary from "../pages/Diary";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        >
            {optionList.map((it, idx) => (
                <option value={it.value} key={idx}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};

const DiaryList = ({ diaryList }) => {
    const [sortType, setSortType] = useState("latest");

    const getProgressedDiaryList = () => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const sortedList = copyList.sort(compare);

        return sortedList;
    };
    return (
        <div>
            <ControlMenu
                value={sortType}
                onChange={setSortType}
                optionList={sortOptionList}
            />
            {getProgressedDiaryList().map((it) => (
                <div key={it.id}>{it.content} </div>
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};
export default DiaryList;
