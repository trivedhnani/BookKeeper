import { gql } from "apollo-boost";
export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
export const bookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authourId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authourId) {
      name
    }
  }
`;
export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
