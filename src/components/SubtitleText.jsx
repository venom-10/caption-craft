const SubtitleText = ({
  id,
  text,
  inTime,
  outTime,
  deleteSubtitle,
  updateSubtitle,
}) => {


  const handleBlur = (e, field) => {
    updateSubtitle(id, field, e.target.textContent)
  };

  return (
    <div className="flex rounded-md border-[.5px] hover:border-indigo-300 border-box shadow-md py-2">
      <div
        contentEditable="true"
        suppressContentEditableWarning="true"
        onBlur={(e) => handleBlur(e, "text")}
        className="w-[65%] px-2 py-1 text-slate-500 text-sm font-medium outline-none"
      >
        {text}
      </div>
      <div className="w-[35%] p-1 flex items-center justify-around">
        <div className="flex flex-col gap-1 text-slate-400">
          <div className="flex text-sm font-medium items-start gap-2 justify-between">
            <div className="flex gap-1 items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 14.666C11.3137 14.666 14 11.9797 14 8.66602C14 5.35231 11.3137 2.66602 8 2.66602C4.68629 2.66602 2 5.35231 2 8.66602C2 11.9797 4.68629 14.666 8 14.666Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 5.33301L8 8.66634"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 8.66602H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 1.33301L6 1.33301"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 2.66602V1.33268"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>In</span>
            </div>
            <span
              contentEditable="true"
              suppressContentEditableWarning="true"
              onBlur={(e) => handleBlur(e, "inTime")}
              className="py-[2px] px-[8px] outline-none"
            >
              {inTime}
            </span>
          </div>
          <div className="flex text-sm font-medium items-start gap-2 justify-between">
            <div className="flex gap-1 items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 14.666C11.3137 14.666 14 11.9797 14 8.66602C14 5.35231 11.3137 2.66602 8 2.66602C4.68629 2.66602 2 5.35231 2 8.66602C2 11.9797 4.68629 14.666 8 14.666Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 5.33301L8 8.66634"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 8.66602H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 1.33301L6 1.33301"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 2.66602V1.33268"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Out</span>
            </div>
            <span
              contentEditable="true"
              suppressContentEditableWarning="true"
              onBlur={(e) => handleBlur(e, "outTime")}
              className="py-[2px] px-[8px] outline-none"
            >
              {outTime}
            </span>
          </div>
        </div>
        <div onClick={() => deleteSubtitle(id)}>
          <svg
            className="hover:cursor-pointer hover:text-[#ff5454]"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M5.3335 4.00016V2.66683C5.3335 2.31321 5.47397 1.97407 5.72402 1.72402C5.97407 1.47397 6.31321 1.3335 6.66683 1.3335H9.3335C9.68712 1.3335 10.0263 1.47397 10.2763 1.72402C10.5264 1.97407 10.6668 2.31321 10.6668 2.66683V4.00016M12.6668 4.00016V13.3335C12.6668 13.6871 12.5264 14.0263 12.2763 14.2763C12.0263 14.5264 11.6871 14.6668 11.3335 14.6668H4.66683C4.31321 14.6668 3.97407 14.5264 3.72402 14.2763C3.47397 14.0263 3.3335 13.6871 3.3335 13.3335V4.00016H12.6668Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              opacity="0.5"
              d="M6.6665 7.3335V11.3335"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              opacity="0.5"
              d="M9.3335 7.3335V11.3335"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SubtitleText;
