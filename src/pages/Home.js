import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
            console.log("cur: ", curDate);
            console.log("fir: ", firstDay);
            console.log("las: ", lastDay);
            console.log(
                diaryList.filter(
                    (it) => firstDay <= it.date && it.date <= lastDay
                )
            );
            setData(
                diaryList.filter(
                    (it) => firstDay <= it.date && it.date <= lastDay
                )
            );
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        // console.log(data);
    }, [data]);
    //15.53

    const increaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        );
    };
    const decreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        );
    };
    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={
                    <MyButton
                        text={"<"}
                        onClick={() => {
                            decreaseMonth();
                        }}
                    />
                }
                rightChild={
                    <MyButton
                        text={">"}
                        onClick={() => {
                            increaseMonth();
                        }}
                    />
                }
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;
