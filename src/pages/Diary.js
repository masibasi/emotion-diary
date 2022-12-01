import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `number${id}`;
    }, []);

    const { id } = useParams();
    //id 를 꺼내쓰자
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
        );
        if (targetDiary) {
            setData(targetDiary);
        } else {
            navigate("/", { replace: true });
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="Diary">로딩중입니다...</div>;
    } else {
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData.emotion_img);

        localStorage.setItem("video", require("./video.mp4"));
        return (
            <div className="Diary">
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))}의 기록`}
                    leftChild={
                        <MyButton
                            text={"뒤로가기"}
                            onClick={() => navigate(-1)}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"수정하기"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <video width="360" height="280" controls="controls">
                            <source
                                src={localStorage.getItem("video")}
                                type="video/mp4"
                            />
                        </video>
                        <h4>오늘의 감정</h4>
                        <div className="diary_img_wrapper">
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;
