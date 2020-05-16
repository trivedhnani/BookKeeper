import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  bookQuery,
  addBookMutation,
} from "../queries/queries";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const [bookDetails, setBookDetails] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const getAuthors = (data) => {
    return data.loading ? (
      <option disabled>Loading Authors</option>
    ) : (
      data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };
  const { name, genre, authorId: authourId } = bookDetails;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };
  const hanldeSubmit = (event) => {
    event.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authourId,
      },
      refetchQueries: [{ query: bookQuery }],
    });
  };
  return (
    <div>
      <form id="add-book" onSubmit={hanldeSubmit}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" name="name" onChange={handleChange} value={name} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            onChange={handleChange}
            value={genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            name="authorId"
            onChange={handleChange}
            value={authourId}
            required
          >
            <option>Select Author</option>
            {getAuthors(getAuthorsQuery)}
          </select>
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
