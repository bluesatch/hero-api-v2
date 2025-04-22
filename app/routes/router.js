const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

router.use(express.static('public'))

// Root Route => localhost:3000/api
router.get('/api', (req, res)=> {
    res.json({
        'Heroes': `http://localhost:${PORT}/api/hero`,
        'Franchises': `http://localhost:${PORT}/api/franchise`,
        'Powers': `http://localhost:${PORT}/api/power`,
        'Species': `http://localhost:${PORT}/api/species`,
        'Teams': `http://localhost:${PORT}/api/team`
    })
})

const endpoints = [
    'hero',
    'power',
    'species',
    'franchise',
    'team'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

module.exports = router 