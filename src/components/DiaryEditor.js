import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";

//Components
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `./assets/emotion1.png`,
        emotion_descript: "great",
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
        emotion_descript: "good",
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
        emotion_descript: "normal",
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
        emotion_descript: "bad",
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
        emotion_descript: "terrible",
    },
];
const getStringDate = (date) => {
    console.log(date.toISOString().slice(0, 10));
    return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
    const navigate = useNavigate();
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit } = useContext(DiaryDispatchContext);
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    };

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(isEdit ? "Confirm edit?" : "Confirm your diary?")) {
            if (!onEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }

        navigate("/", { replace: true });
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);
    return (
        <div className="DiaryEditor">
            <MyHeader
                leftChild={
                    <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />
                }
                headText={isEdit ? "Edit" : "Write new Diary"}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            value={date}
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="how was today"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton
                            text={"cancel"}
                            onClick={() => navigate(-1)}
                        />
                        <MyButton
                            text={"confirm"}
                            type={"POSITIVE"}
                            onClick={() => handleSubmit()}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
