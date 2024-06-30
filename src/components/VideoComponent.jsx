import { forwardRef, useCallback, useEffect, useState } from "react";

const VideoComponent = forwardRef(({ captions, reset }, ref) => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isToggle, setIsToggle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [captionTrack, setCaptonTrack] = useState(null);
  const [urlDefault, setUrlDefault] = useState(false);

  const convertTime = useCallback((timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  }, []);

  useEffect(() => {
    if (ref.current) {
      const track =
        captionTrack || ref.current.addTextTrack("captions", "Captions", "en");
      while (track.cues.length > 0) {
        track.removeCue(track.cues[0]);
      }
      setCaptonTrack(track);
      captions.forEach((caption) => {
        if (caption.text.trim() && convertTime(caption.outTime)) {
          const cue = new VTTCue(
            convertTime(caption.inTime),
            convertTime(caption.outTime),
            caption.text
          );
          track.addCue(cue);
        }
      });
    }
  }, [captions]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
    };

    if (ref.current) {
      ref.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      ref.current.load();
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [isToggle]);

  const handlePlayPause = () => {
    if (isPlaying) {
      ref.current.pause();
    } else {
      if (captionTrack) {
        captionTrack.mode = "showing";
        captionTrack.mode = "showing";
      }
      ref.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (ref.current.duration) {
      const currentTime = ref.current.currentTime,
        duration = ref.current.duration;
      const currentProgress = (currentTime / duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSlide = (e) => {
    const val = e.target.value;
    const duration = ref.current.duration;
    const skipTime = (val * duration) / 100;
    ref.current.currentTime = skipTime;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const reinitialize = () => {
    setIsToggle(false);
    setIsPlaying(false);
    setIsVideoLoaded(false);
    setCaptonTrack(null);
    setUrlDefault(false);
    setUrl("");
    setProgress(0);
    reset();
  };

  return (
    <div className="w-full h-full p-6">
      {!isToggle ? (
        <div className="add-video w-full p-4">
          <label
            htmlFor="video_url"
            className="block mb-1 text-md font-semibold text-[#5c5e65] "
          >
            Add a video
          </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="https://selena.mp4"
            required
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsToggle(true)}
              className="flex items-center gap-1 text-[#5c5e65] hover:bg-[#ebedff] hover:text-[#5666f5] font-semibold rounded-lg text-sm border-[.5px] shadow-md mt-2 text-center px-6 py-2 active:shadow-none"
            >
              <span className="mr-2">Add</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsToggle(true);
                setUrlDefault(true);
              }}
              className="flex items-center gap-1 text-[#5c5e65] hover:bg-[#ebedff] hover:text-[#5666f5] font-semibold rounded-lg text-sm border-[.5px] shadow-md mt-2 text-center px-6 py-2 active:shadow-none"
            >
              <span className="mr-2">Use Default</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <div className="w-[45%] h-[650px] relative">
            <div
              onClick={() => {
                reinitialize();
              }}
              className="absolute z-10 flex items-center justify-center rounded-full w-[35px] h-[35px] right-0  cursor-pointer"
            >
              <svg
                className="w-[20px] h-[20px] hover:w-[25px] hover:h-[25px]"
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </div>
            <video
              ref={ref}
              src={urlDefault ? `../../public/selena.mp4` : url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full shadow-lg rounded-md border-2"
            />
          </div>
          {isVideoLoaded && (
            <div className="controls w-[45%] mt-2">
              <div className="w-full flex gap-1 items-center text-medium font-medium text-slate-400">
                <span className="">{formatTime(ref.current.currentTime)}</span>
                <input
                  className="flex-grow"
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => handleSlide(e)}
                  style={{
                    background: `linear-gradient(to right, #4a90e2 ${progress}%, #ddd ${progress}%)`,
                  }}
                />
                <span className="">{formatTime(ref.current.duration)}</span>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="cursor-pointer p-[5px]">
                  <svg
                    onClick={() => {
                      ref.current.currentTime -= 5;
                    }}
                    className="w-[30px] h-[30px] active:w-[25px] active:h-[25px transition-all duration-200"
                    fill="#5c5e65"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" />
                  </svg>
                </div>
                <div className="cursor-pointer p-[5px]">
                  {!isPlaying ? (
                    <svg
                      onClick={handlePlayPause}
                      className="w-[30px] h-[30px] active:w-[25px] active:h-[25px] transition-all duration-200"
                      fill="#5c5e65"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                  ) : (
                    <svg
                      onClick={handlePlayPause}
                      className="w-[30px] h-[30px] active:w-[25px] active:h-[25px] transition-all duration-200"
                      fill="#5c5e65"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                    </svg>
                  )}
                </div>
                <div className="cursor-pointer p-[5px]">
                  <svg
                    onClick={() => {
                      ref.current.currentTime += 5;
                    }}
                    className="w-[30px] h-[30px] active:w-[25px] active:h-[25px] transition-all duration-200"
                    fill="#5c5e65"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default VideoComponent;
