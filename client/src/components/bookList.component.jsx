import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
const bookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
const BookList = (props) => {
  //   console.log(props);
  const books = (data) => {
    return data.loading ? (
      <div>Loading</div>
    ) : (
      data.books.map((book) => <li key={book.id}>{book.name}</li>)
    );
  };
  return (
    <div>
      <ul id="book-list">{books(props.data)}</ul>
    </div>
  );
};
export default graphql(bookQuery)(BookList);
