const express = require('express')
const router = express.Router()

const { franchiseDao: dao } = require('../../daos/dao')

// localhost:3000/api/franchise
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/franchise/:franchise', (req, res)=> {
    dao.findHeroesByFranchise(res, dao.table, req.params.franchise)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router