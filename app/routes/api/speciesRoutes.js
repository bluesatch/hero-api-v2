const express = require('express')
const router = express.Router()

const { speciesDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/species/:species', (req, res)=> {
    dao.findHeroesBySpecies(res, dao.table, req.params.species)
})

router.get('/species/:species/alignment/:alignment', (req, res)=> {
    dao.findSpeciesAndAlignment(res, dao.table, req.params.species, req.params.alignment)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router