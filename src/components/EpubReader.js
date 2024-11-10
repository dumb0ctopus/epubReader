import React, { useEffect, useRef, useState } from "react";
import ePub from "epubjs";
import TOCOverlay from "./TOCOverlay";
import "./EpubReader.css"; 

function EpubReader({ epubData, initialLocation, onLocationChange }) {
  const viewerRef = useRef(null);
  const renditionRef = useRef(null);
  const bookRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Georgia");

  const onLocationChangeRef = useRef(onLocationChange);

  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  useEffect(() => {
    if (!epubData) return;

    if (!bookRef.current) {
      console.log("Initializing EPUB Reader");

      bookRef.current = ePub(epubData);

      const rendition = bookRef.current.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true,
        flow: "paginated", 
        spread: "none", 
      });

      renditionRef.current = rendition;

      const applyFont = (font) => {
        rendition.themes.font(font);
      };

      applyFont(selectedFont);

      rendition.themes.register("light", {
        body: {
          background: "#f5f5f5",
          color: "#333333",
          fontFamily: selectedFont,
          lineHeight: "1.6",
          fontSize: "1.2em",
        },
      });

      rendition.themes.register("sepia", {
        body: {
          background: "#f4ecd8",
          color: "#5b4636",
          fontFamily: selectedFont,
          lineHeight: "1.6",
          fontSize: "1.2em",
        },
      });

      rendition.themes.register("dark", {
        body: {
          background: "#1e1e1e",
          color: "#cfcfcf",
          fontFamily: selectedFont,
          lineHeight: "1.6",
          fontSize: "1.2em",
        },
      });

      rendition.themes.select("light");

      rendition.hooks.content.register((contents) => {
        contents.addStylesheetRules(`
          /* CSS to start new chapters on a new page */
          h1, h2 {
            page-break-before: always;
            break-before: page;
          }
          /* If your chapters have a specific class or ID, use that selector */
          .chapter {
            page-break-before: always;
            break-before: page;
          }
        `);
      });

      if (initialLocation) {
        rendition.display(initialLocation);
      } else {
        rendition.display();
      }

      // Get the TOC
      bookRef.current.loaded.navigation.then((nav) => {
        setToc(nav.toc);
      });

      rendition.on("relocated", (location) => {
        if (onLocationChangeRef.current) {
          onLocationChangeRef.current(location.start.cfi);
        }
      });
    }

    return () => {
      if (bookRef.current) {
        console.log("Destroyed EPUB Reader");
        renditionRef.current.destroy();
        bookRef.current.destroy();
        bookRef.current = null;
        renditionRef.current = null;
      }
    };
  }, [epubData, selectedFont]); 

  const handleTocClick = (href) => {
    if (renditionRef.current) {
      renditionRef.current.display(href);
      setIsTocOpen(false);
    }
  };

  const toggleToc = () => {
    setIsTocOpen(!isTocOpen);
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    if (renditionRef.current) {
      renditionRef.current.themes.font(font);
      renditionRef.current.themes.update("light", {
        body: { fontFamily: font },
      });
      renditionRef.current.themes.update("sepia", {
        body: { fontFamily: font },
      });
      renditionRef.current.themes.update("dark", {
        body: { fontFamily: font },
      });
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  const handlePrev = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  return (
    <div className="h-full flex justify-center items-center relative">
      {/* Hamburger Menu */}
      <button
        className="absolute top-4 left-4 z-20 bg-white text-gray-800 p-2 ronded shadow hover:bg-gray-100 focus:outline-none"
        onClick={toggleToc}
      >
        ☰
      </button>

      {/* Font Selection Buttons */}
      <div className="absolute top-4 left-20 z-20 flex space-x-2">
        <button
          onClick={() => handleFontChange("'Georgia', serif")}
          className="bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100"
        >
          Georgia
        </button>
        <button
          onClick={() => handleFontChange("'Merriweather', serif")}
          className="bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100"
        >
          Merriweather
        </button>
        <button
          onClick={() => handleFontChange("'Roboto', sans-serif")}
          className="bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100"
        >
          Roboto
        </button>
        <button
          onClick={() => handleFontChange("'Libre Baskerville', serif")}
          className="bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100"
        >
          Libre Baskerville
        </button>
      </div>

      {/* Theme Selection Buttons */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={() =>
            renditionRef.current && renditionRef.current.themes.select("light")
          }
          className="bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100"
        >
          Light
        </button>
        <button
          onClick={() =>
            renditionRef.current && renditionRef.current.themes.select("sepia")
          }
          className="bg-yellow-200 text-brown-800 p-2 rounded shadow hover:bg-yellow-300"
        >
          Sepia
        </button>
        <button
          onClick={() =>
            renditionRef.current && renditionRef.current.themes.select("dark")
          }
          className="bg-gray-800 text-white p-2 rounded shadow hover:bg-gray-900"
        >
          Dark
        </button>
      </div>

      {/* Next and Previous Buttons */}
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-12 z-20 bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100 focus:outline-none"
        onClick={handlePrev}
      >
        Previous
      </button>
      <button
        className="absolute bottom-4 left-1/2 transform translate-x-12 z-20 bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100 focus:outline-none"
        onClick={handleNext}
      >
        Next
      </button>

      {/* TOC Overlay */}
      <TOCOverlay
        toc={toc}
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onTocClick={handleTocClick}
      />

      {/* EPUB Viewer */}
      <div
        className="h-full w-full lg:w-[80%] md:w-[90%] sm:px-24 flex justify-center items-center"
        ref={viewerRef}
      ></div>
    </div>
  );
}

export default EpubReader;
