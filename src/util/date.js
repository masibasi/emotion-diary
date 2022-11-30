import React from "react";

export const getStringDate = (date) => {
    // console.log(date.toISOString().slice(0, 10));
    return date.toISOString().slice(0, 10);
};
