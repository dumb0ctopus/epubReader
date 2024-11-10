import React, { useState, useEffect, useCallback } from "react";
import EpubReader from "./components/EpubReader";
import Homepage from "./components/Homepage";
import { getBooks, addBook, updateBook, deleteBook } from "./utils/storage";

function App() {
  const [books, setBooks] = useState([]); 
  const [currentBook, setCurrentBook] = useState(null); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedBooks = await getBooks();
      setBooks(storedBooks);

      const currentBookId = localStorage.getItem("currentBookId");
      if (currentBookId) {
        const book = storedBooks.find((b) => b.id === Number(currentBookId));
        if (book) {
          setCurrentBook(book);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (currentBook) {
      localStorage.setItem("currentBookId", currentBook.id);
    } else {
      localStorage.removeItem("currentBookId");
    }
  }, [currentBook]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type !== "application/epub+zip" &&
        !file.name.toLowerCase().endsWith(".epub")
      ) {
        setError("Please select a valid EPUB file.");
        return;
      }
      setError(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target.result;
        (async () => {
          const newBook = { name: file.name, data: buffer, lastLocation: null };
          const id = await addBook(newBook);
          newBook.id = id; 
          setBooks((prevBooks) => [...prevBooks, newBook]);
        })();
      };
      reader.onerror = () => {
        setError("Error reading file.");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleRemoveBook = async (id) => {
    await deleteBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleReadBook = useCallback((book) => {
    setCurrentBook(book);
  }, []);

  const handleBackToHome = () => {
    setCurrentBook(null);
  };

  const handleLocationChange = useCallback(
    async (location) => {
      if (!currentBook) return;

      const updatedBook = { ...currentBook, lastLocation: location };
      await updateBook(updatedBook);
      setCurrentBook(updatedBook); 

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
    },
    [currentBook]
  );
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <h1 className="text-white text-2xl font-bold">EPUB Reader</h1>
      </header>
      <main className="flex-1 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : currentBook ? (
          <>
            <button
              onClick={handleBackToHome}
              className="absolute top-4 left-16 z-20 bg-white text-gray-800 p-2 rounded shadow hover:bg-gray-100 focus:outline-none"
            >
              ← Back to Home
            </button>
            <EpubReader
              epubData={currentBook.data}
              initialLocation={currentBook.lastLocation}
              onLocationChange={handleLocationChange}
            />
          </>
        ) : (
          <Homepage
            books={books}
            handleReadBook={handleReadBook}
            handleRemoveBook={handleRemoveBook}
            handleFileChange={handleFileChange}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

export default App;
