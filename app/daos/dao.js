// dao.js is where all the cool daos hang out

const daoCommon = require('./common/daoCommon')

const heroDao = {
    ...daoCommon,
    ...require('./api/heroDao')
}

const powerDao = {
    ...daoCommon,
    ...require('./api/powerDao')
}

const speciesDao = {
    ...daoCommon,
    ...require('./api/speciesDao')
}

const franchiseDao = {
    ...daoCommon,
    ...require('./api/franchiseDao')
}

const teamDao = {
    ...daoCommon,
    ...require('./api/teamDao')
}

module.exports = {
    heroDao,
    powerDao,
    speciesDao,
    franchiseDao,
    teamDao
}