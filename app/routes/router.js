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

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// get heroCount
let heroCount = 0

axios.get(`http://localhost:${PORT}/api/hero/count`).then(resp => heroCount = resp.data.count)


// home page
router.get('/', (req, res)=> {
    // res.render(path => where are we rendering, obj => what are we rendering)
    res.render('pages/home', {
        title: 'Home',
        name: 'My Hero Website',
        endpoints
    })
})

// hero page => localhost:3000/heroes
router.get('/hero', (req, res)=> {

    // make our fetch call 
    const url = `http://localhost:${PORT}/api/hero`

    axios.get(url).then(resp => {
        res.render('pages/allHero', {
            title: 'All Heroes',
            name: 'All Heroes...and some villians too!',
            data: resp.data,
            endpoints
        })
    })
})

router.get('/hero/:id', (req, res)=> {

    // console.log('heroCount: ', heroCount)

    const id = req.params.id

    const url = `http://localhost:${PORT}/api/hero/${id}`

    axios.get(url)
        .then(resp => {
            // console.log(resp.data)

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

// powers

router.get('/power', (req, res)=> {

    axios.get('http://localhost:3000/api/power')
    .then(resp => {

        // console.log(resp)
        res.render('pages/allPower', {
            title: 'Powers',
            name: 'All of the Powers',
            data: resp.data,
            endpoints
        })
    })
} )

router.get('/power/:power', (req, res)=> {

    const power = req.params.power

    const url = `http://localhost:${PORT}/api/power/pow/${power}`

    axios.get(url)
        .then(resp => {

            res.render('pages/powerSingle', {
                title: power,
                name: power,
                data: resp.data,
                endpoints
            })
        })
})

router.get('/species', (req, res)=> {

    const url = `http://localhost:${PORT}/api/species`

    axios.get(url)
        .then(resp=> {
            res.render('pages/allSpecies', {
                title: 'Species',
                name: 'All Species',
                data: resp.data,
                endpoints
            })
        })
})


router.get('/species/:species', (req, res)=> {

    const species = req.params.species

    const url = `http://localhost:${PORT}/api/species/species/${species}`

    axios.get(url)
        .then(resp => {
            res.render('pages/speciesSingle', {
                title: species,
                name: species,
                data: resp.data,
                endpoints
            })
        })
})


module.exports = router 