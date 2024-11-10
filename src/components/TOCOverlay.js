// src/components/TOCOverlay.js
import React, { useEffect } from "react";

function TOCOverlay({ toc, isOpen, onClose, onTocClick }) {
  // Close TOC on ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay Background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-50`}
        onClick={onClose}
      ></div>

      {/* TOC Container */}
      <div
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="toc-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="toc-title" className="text-xl font-semibold">
            Table of Contents
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
            aria-label="Close TOC"
          >
            ×
          </button>
        </div>
        <ul className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          {toc.map((chapter, index) => (
            <li key={index} className="mb-2">
              <button
                className="w-full text-left text-blue-600 hover:underline focus:outline-none"
                onClick={() => onTocClick(chapter.href)}
              >
                {chapter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TOCOverlay;
