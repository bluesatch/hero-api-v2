// dao.js is where all the cool daos hang out

const daoCommon = require('./common/daoCommon')

const heroDao = {
    ...daoCommon,
    ...require('./api/heroDao')
}

module.exports = {
    heroDao
}