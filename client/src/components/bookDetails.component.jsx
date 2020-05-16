import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
const BookDetails = (props) => {
  const displayBook = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All the books by author:</p>
          <ul className="other-books">
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };
  return (
    <div id="book-details">
      <h1>Book details</h1>
      {displayBook()};
    </div>
  );
};
export default graphql(getBookQuery, {
  options: (props) => {
    return { variables: { id: props.bookId } };
  },
})(BookDetails);
