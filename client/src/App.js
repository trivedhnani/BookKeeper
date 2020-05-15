import React from "react";
import BookList from "./components/bookList.component";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Hello</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
