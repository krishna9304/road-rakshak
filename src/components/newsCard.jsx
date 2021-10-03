import React from "react";
import { useState } from "react";
import NewsModal from "./newsModal";
const NewsCard = ({ img, headline, description, references }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex mb-4 cursor-pointer w-full h-36 md:h-40 shadow-md p-2"
      >
        <div className="w-1/3 md:w-1/5 h-full">
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="w-2/3 md:w-4/5 h-full">
          <div className="w-full text-2xl p-1 font-semibold shadow-sm overflow-ellipsis overflow-hidden whitespace-nowrap h-1/4">
            {headline}
          </div>
          <div className="w-full text-xs md:text-sm p-1 h-3/4 overflow-ellipsis overflow-hidden">
            {description}
          </div>
        </div>
      </div>
      {open ? (
        <NewsModal
          img={img}
          headline={headline}
          description={description}
          references={references}
          setOpen={setOpen}
        />
      ) : null}
    </>
  );
};

export default NewsCard;
