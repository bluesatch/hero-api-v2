const express = require('express')
const router = express.Router()
const axios = require('axios')

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

// get heroCount
let heroCount = 0

axios.get(`http://localhost:${PORT}/api/hero/count`).then(resp => heroCount = resp.data.count)


endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))

})


//home page
router.get('/', (req, res)=> {
    // res.render(path => where are we rendering, obj => what are we rendering)
    res.render('pages/home', {
        title: 'Home',
        name: 'My Hero Website',
        endpoints
    })
})

for (let i = 0; i < endpoints.length; i++) {
    //  do stuff
    const endpoint = endpoints[i]
    // if endpoints[i] == 'hero'
    if (endpoint == 'hero') {
        router.get(`/${endpoint}`, (req, res)=> {
            
            const url = `http://localhost:${PORT}/api/${endpoint}`

            axios.get(url)
                .then(resp => {
                    res.render('pages/allHero', {
                        title: 'Heroes',
                        name: 'All Heroes',
                        data: resp.data,
                        endpoints
                    })
                })
        })

        router.get(`/${endpoint}/:id`, (req,res)=> {

            const id = req.params.id 

            const url = `http://localhost:${PORT}/api/${endpoint}/${id}`

            axios.get(url)
                .then(resp => {
                    let heroName = resp.data.hero_name == null ? `${resp.data.first_name} ${resp.data.last_name}` : resp.data.hero_name

                    res.render('pages/heroSingle', {
                        title: heroName,
                        name: heroName,
                        data: resp.data,
                        count: heroCount,
                        endpoints
                    })
                })
        })
    } else {
        router.get(`/${endpoint}`, (req, res)=> {

            const url = `http://localhost:${PORT}/api/${endpoint}`

            axios.get(url)
                .then(resp => {
                    res.render('pages/allData', {
                        title: endpoint,
                        name: `All ${endpoint}`,
                        data: resp.data,
                        endpoints,
                        category: endpoint
                    })
                })
        })

        router.get(`/${endpoint}/:node`, (req, res)=> {

            const node = req.params.node

            const url = `http://localhost:${PORT}/api/${endpoint}/${endpoint}/${node}`

            axios.get(url)
                .then(resp => {
                    res.render('pages/dataSingle', {
                        title: node,
                        name: node,
                        data: resp.data,
                        endpoints
                    })
                })
        })
    }

}

module.exports = router 