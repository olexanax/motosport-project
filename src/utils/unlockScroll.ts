import React from "react";

const unlockScroll = () => {
    const html = document.querySelector("html");
    document.body.style.overflowY = "unset";
    if (html) html.style.overflow = "unset";
};

export default unlockScroll;
