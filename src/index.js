import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import { graphqlHTTP } from 'express-graphql'

import { appConfig, api } from './config/index.js'
import { logger, requestTime, checkAuthenticated } from './middlewares/index.js'
import {
  routerServers,
  routerLogin,
  routerRegister,
  routerLogout,
} from './routes/index.js'
import { initializePassport } from './utils/passport-config.js'
import { graphqlBooks } from './entities/books.js'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

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

/** for AUTH functionality */
app.use(flash())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

/**custom middlewares */
app.use(requestTime)
app.use(logger)

/**router "/api/servers" */
app.use(routerServers)

/**graphql example with books */
app.use(api.books, graphqlHTTP(graphqlBooks))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', {
    title: 'Home page',
    pageId: 'home',
    name: req.user.name,
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

/**AUTH */
initializePassport(passport)
app.use(routerLogin)
app.use(routerRegister)
app.use(routerLogout)

app.listen(port, () => {
  console.log(`Server has been started on port: ${port}...`)
})
