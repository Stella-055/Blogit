import { useState,useRef } from "react";

const Post = () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef<HTMLInputElement>(null);

    const handleMouseMove = (e:React.MouseEvent) => {
        const bounds = (divRef.current)!.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
        <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ml-6"
        >
              {visible && (
                <div className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
                    style={{ top: - 300, left: position.x - 300,}}
                />
            )}

            <a href="#">
                <img className="rounded-t-lg w-96 h-56 object-cover object-top" src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=800" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        How AI is Transforming the Future of Work
                    </h5>
                </a>
                <p className="mb-3 font-mal text-gray-700">Explore how artificial intelligence is reshaping industries, enhancing productivity, and opening new career paths in the modern workforce.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
};
export default Post