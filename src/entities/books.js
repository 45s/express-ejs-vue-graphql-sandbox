import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import { books, authors } from '../constants/books.js'

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => {
        return books.filter(book => book.authorId === author.id)
      },
    },
  }),
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents the book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: book => {
        return authors.find(author => author.id === book.authorId)
      },
    },
  }),
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A single Book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find(book => book.id === args.id),
    },
    books: {
      type: GraphQLList(BookType),
      description: 'List of books',
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: 'A single Author',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id),
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: 'List of authors',
      resolve: () => authors,
    },
  }),
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        }
        books.push(book)
        return book
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add a author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        }
        authors.push(author)
        return author
      },
    },
  }),
})

export const graphqlBooks = {
  schema,
  graphiql: true,
  mutation: RootMutationType,
}
