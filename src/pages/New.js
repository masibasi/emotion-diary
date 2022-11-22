import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
    return (
        <div className="New">
            <DiaryEditor />
        </div>
    );
};

export default New;
