import { useState, useRef } from "react";
const Posts = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = divRef.current!.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <span
        className="absolute px-2 py-1 z-10 whitespace-nowrap text-sm rounded bg-white/20 border border-gray-200 backdrop-blur-[4px] text-gray-900 font-medium pointer-events-none"
        style={{
          top: position.y + 10,
          left: position.x + 10,
          opacity: tooltipVisible ? 1 : 0,
          transform: tooltipVisible ? "scale(1)" : "scale(0.6)",
          transition: "all 0.2s ease-out",
        }}
      >
        Author: John Doe
      </span>

      <a href="#">
        <img
          className="rounded-t-lg w-96 h-56 object-cover object-top"
          src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            How AI is Transforming the Future of Work
          </h5>
        </a>
        <p className="mb-3 font-mal text-gray-700">
          Explore how artificial intelligence is reshaping industries, enhancing
          productivity, and opening new career paths in the modern workforce.
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default Posts;
