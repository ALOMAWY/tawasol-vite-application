import React, { useEffect, useState } from "react";

function Title() {
  const TITLES = [
    "Create your TawaSol profile and connect with other developers",
    "TawaSol is the first website in the Arab World to connect engineers",
    "Build a professional network with other developers",
  ];

  let [titleIndex, setTitleIndex] = useState(0);
  let [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    let titleTimeOut = null;
    let titleInterval = null;
    titleInterval = setInterval(() => {
      setTitleIndex((titleIndex + 1) % TITLES.length);
      setFadeIn(true);

      titleTimeOut = setTimeout(() => {
        setFadeIn(false);
      }, 4000);
    }, 8000);

    titleTimeOut = setTimeout(() => {
      setFadeIn(false);
    }, 4000);

    return function cleanup() {
      clearInterval(titleInterval);
      clearTimeout(titleTimeOut);
    };
  }, [titleIndex]);

  return (
    <p className={fadeIn ? "title-fade-in" : "title-fade-out"}>
      I'm {TITLES[titleIndex]}
    </p>
  );
}

export default Title;
