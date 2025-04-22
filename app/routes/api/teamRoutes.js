const router = require('express').Router()

const { teamDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/team/:team', (req, res)=> {
    dao.findHeroesByTeam(res, dao.table, req.params.team)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router