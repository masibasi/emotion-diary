import React from "react";

const MyButton = ({ text, type, onClick }) => {
    const btnType = ["POSITIVE", "NEGATIVE"].includes(type) ? type : "default";

    return (
        <button
            className={["MyButton", `MyButton_${type}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default",
    text: "default",
};
export default MyButton;
