import React from "react";

const lockScroll = () => {
    const html = document.querySelector("html");
    document.body.style.overflow = "hidden";
    if (html) html.style.overflow = "hidden";
};

export default lockScroll;
