import React, { useEffect, useRef, useState } from "react";
import SubtitleText from "./components/SubtitleText";
import AddSubtitleButton from "./components/AddSubtitleButton";
import VideoComponent from "./components/VideoComponent";

function App() {
  const [subtitleArray, setSubtitleArray] = useState([]);
  const videoRef = useRef(null);


  const handleAddSubtitleTitle = () => {
    if(!videoRef.current) {
      alert("Please add a video")
      return;
    }
    setSubtitleArray((preVal) => {
      return [
        ...preVal,
        {
          id: preVal.at(-1)?.id + 1 || 0,
          text: "",
          inTime: "00:00",
          outTime: "00:00",
        },
      ];
    });
  };

  const resetSubtitleArray = () => {
    setSubtitleArray([]);
  }

  const handleDeleteSubtitleTitle = (id) => {
    setSubtitleArray((preVal) => {
      return subtitleArray.filter((element) => element.id != id);
    });
  };

  const updateSubtitle = (id, field, value) => {
    setSubtitleArray((prevSubtitles) =>
      prevSubtitles.map((subtitle) =>
        subtitle.id === id ? { ...subtitle, [field]: value } : subtitle
      )
    );
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex">
        <div className="basis-[30%] py-6 px-[5px] bg-[#ffffff] backdrop-blur shadow-md border-r-2 ">
          <p className="font-sans pb-2 text-xl font-bold text-center border-b-2">
            Subtitles
          </p>
          <div className="w-full mt-2 p-2 rounded-md">
            <div className="subtitle-div flex flex-col gap-1 my-2">
              {subtitleArray.map((element) => (
                <SubtitleText
                  key={element.id}
                  id={element.id}
                  text={element.text}
                  inTime={element.inTime}
                  outTime={element.outTime}
                  updateSubtitle={updateSubtitle}
                  deleteSubtitle={handleDeleteSubtitleTitle}
                />
              ))}
            </div>
            <AddSubtitleButton extendSubtitle={handleAddSubtitleTitle} />
          </div>
        </div>
        <div className="video basis-[70%] h-screen bg-[#f7f7f8] flex items-center justify-center">
          <VideoComponent ref={videoRef} captions={subtitleArray} reset={resetSubtitleArray}/>
        </div>
      </div>
    </>
  );
}

export default App;
