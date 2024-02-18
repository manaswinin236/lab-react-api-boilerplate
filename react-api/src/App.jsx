import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBookList(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          console.error("Status 404 - Not Found");
          // Handle 404 error as required
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {bookList.length ? (
          <div className="book-container">
            {bookList.map((book, index) => (
              <div key={index} className="book">
                <h2>{book.title}</h2>
                <div className="book-details">
                  <img src={book.imageLinks.thumbnail} alt={book.title} />
                  <p>{book.description}</p>
                </div>
                <p>{book.authors.join(", ")}</p>
                {index !== bookList.length - 1 && <hr />}{" "}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;