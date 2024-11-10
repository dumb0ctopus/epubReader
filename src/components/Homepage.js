import React from "react";

function Homepage({
  books,
  handleReadBook,
  handleRemoveBook,
  handleFileChange,
  error,
}) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Books</h2>
        <div>
          <input
            type="file"
            accept=".epub"
            onChange={handleFileChange}
            className="hidden"
            id="epub-upload"
          />
          <label
            htmlFor="epub-upload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Upload EPUB
          </label>
        </div>
      </div>
      {error && (
        <div className="bg-red-200 text-red-800 p-2 text-center mb-4">
          {error}
        </div>
      )}
      {books.length === 0 ? (
        <p>No books uploaded yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li
              key={book.id}
              className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow"
            >
              <span>{book.name}</span>
              <div>
                <button
                  onClick={() => handleReadBook(book)}
                  className="mr-2 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Read
                </button>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Homepage;
