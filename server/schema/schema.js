const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const Book = require("../models/book.model");
const Author = require("../models/author.model");
const _ = require("lodash");
// Dummy data
// const books = [
//   { name: "a", genre: "x", id: "1", authorId: "1" },
//   { name: "b", genre: "y", id: "2", authorId: "2" },
//   { name: "c", genre: "z", id: "3", authorId: "3" },
//   { name: "d", genre: "z", id: "4", authorId: "3" },
//   { name: "e", genre: "x", id: "5", authorId: "1" },
//   { name: "g", genre: "z", id: "6", authorId: "2" },
// ];
// const authors = [
//   { name: "AB", age: 21, id: "1" },
//   { name: "CD", age: 21, id: "2" },
//   { name: "XY", age: 21, id: "3" },
// ];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return await Author.findById(parent.authorId);
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return await Book.find({ authorId: parent.id });
      },
    },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // code to get the data from source
        return await Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return await Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books;
        return await Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return authors;
        return await Author.find({});
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const author = await Author.create({ name: args.name, age: args.age });
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = await Book.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
