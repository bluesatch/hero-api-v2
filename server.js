const express = require('express')
const server = express()
const router = require('./app/routes/router')
const helmet = require('helmet')
const cors = require('cors')
const PORT = process.env.PORT || 3000

// Handle security
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false, 
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
})
)

server.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true}))
// server.use(cors())
// server.use(express.json())
// server.use(express.urlencoded({ extended: true}))

// localhost:3000 => router.js
server.use('/', router)
server.set('view engine', 'ejs')

server.listen(PORT, ()=> console.log(`Port ${PORT} is up, up, and away...`))

