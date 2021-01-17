import express from 'express'
import path from 'path'
import { graphqlHTTP } from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import { appConfig } from './config/index.js'
import { api } from './config/api.js'
import { logger, requestTime } from './middlewares/index.js'
import { routerServer } from './routes/servers.js'
import { books, authors } from './constants/books.js'

/**for import/export in nodejs */
const __dirname = path.resolve()

const port = process.env.PORT ?? 3000
const { staticFolderName } = appConfig

const app = express()

/**express key-string */
const viewEngine = 'view engine'
app.set(viewEngine, 'ejs')

/**rename default folder "views" -> "ejs-templates" */
app.set('views', path.resolve(__dirname, 'src/ejs-templates'))
app.get(viewEngine)

/**set "static" folder (auto catch routes from static folder ) */
app.use(express.static(path.resolve(__dirname, `src/${staticFolderName}`)))

/**middlewares for "JSON" functionality */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**custom middlewares */
app.use(requestTime)
app.use(logger)

/**router "/api/servers" */
app.use(routerServer)

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

/**graphql example with books */
app.use(
  api.books,
  graphqlHTTP({
    schema,
    graphiql: true,
    mutation: RootMutationType,
  })
)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    pageId: 'home',
  })
})

app.get('/ejs-tutorial', (req, res) => {
  res.render('ejs-tutorial', {
    title: 'EJS Tutorial page',
    pageId: 'ejs-tutorial',
  })
})

app.get('/test-vue', (req, res) => {
  res.render('test-vue', {
    title: 'Test VueJS',
    pageId: 'test-vue',
  })
})

app.get('/download', (req, res) => {
  res.download(path.resolve(__dirname, staticFolderName, 'features.html'))
})

app.listen(port, () => {
  console.log(`Server has been started on port: ${port}...`)
})
