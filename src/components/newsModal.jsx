import { useState } from "react";
import { Link } from "react-router-dom";

const NewsModal = ({ setOpen, img, description, headline, references }) => {
  const [active, setActive] = useState(true);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80">
      <div className="flex justify-center items-center h-screen w-screen">
        <dialog
          open
          className="rounded-2xl overflow-hidden p-0 w-auto max-w-7xl md:mx-auto md:w-2/3 shadow-lg m-8"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="relative h-64 sm:h-80 w-full lg:h-auto lg:w-1/3 xl:w-2/5 flex-none">
              <img
                src={img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute block inset-x-0 bottom-0 lg:hidden lg:inset-y-0 lg:right-auto bg-gradient-to-t lg:bg-gradient-to-r from-white to-transparent w-full h-16 lg:h-full lg:w-16"></span>
            </div>
            <div className="w-full">
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-8" onClick="test">
                    {headline}
                  </h3>
                  <Link
                    onClick={() => {
                      setOpen(false);
                    }}
                    to="/news"
                    className="text-gray-400 hover:text-gray-800 p-1"
                  >
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </Link>
                </div>
                <div className="relative">
                  <header className="flex items-end text-sm">
                    <button
                      onClick={() => {
                        setActive(true);
                      }}
                      className="border border-b-0 px-3 py-1 text-sm focus:outline-none rounded-tl-md"
                    >
                      Description
                    </button>
                    <button
                      onClick={() => {
                        setActive(false);
                      }}
                      className="border border-b-0 px-3 py-1 text-sm focus:outline-none rounded-tl-md"
                    >
                      References
                    </button>
                  </header>
                  <div
                    className="border p-2 h-48 overflow-y-auto rounded-b-xl rounded-tr-xl"
                    id="tabs-contents"
                  >
                    {active ? (
                      <div>
                        <p className="text-xs text-gray-500 line-clamp-3">
                          {description}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <ul className="text-xs text-gray-500 line-clamp-3">
                          {references.map((item) => {
                            return (
                              <li>
                                <a target="_blank" rel="noreferrer" href={item}>
                                  {item}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default NewsModal;
