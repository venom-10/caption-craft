const AddSubtitleButton = ({ extendSubtitle }) => {
  return (
    <div onClick={extendSubtitle} className="cursor-pointer flex items-center bg-[#f7f7f8] px-4 py-5 rounded-md font-bold text-[#5c5e65] hover:bg-[#ebedff] hover:text-[#5666f5] gap-2 justify-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2.5V9.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M2.5 6H9.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span>Add New Subtitles Line</span>
    </div>
  );
};

export default AddSubtitleButton;
