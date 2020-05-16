import React, { useState } from "react";
import { graphql } from "react-apollo";
import { bookQuery } from "../queries/queries";
import BookDetails from "./bookDetails.component";
const BookList = (props) => {
  //   console.log(props);
  const [bookId, setBookId] = useState(null);
  const handleClick = (book) => (event) => {
    const { id } = book;
    setBookId(id);
  };
  const books = (data) => {
    return data.loading ? (
      <div>Loading</div>
    ) : (
      data.books.map((book) => (
        <li key={book.id} onClick={handleClick(book)}>
          {book.name}
        </li>
      ))
    );
  };
  return (
    <div>
      <ul id="book-list">{books(props.data)}</ul>
      <BookDetails bookId={bookId} />
    </div>
  );
};
export default graphql(bookQuery)(BookList);
