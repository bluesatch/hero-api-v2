const con = require('../../config/dbconfig')

const daoCommon = {

    findAll: (res, table)=> {
        con.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                if (!error) {
                    // do stuff
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    // do something else
                    console.log('DAO ERROR: ', error )
                }
            }
        )
    },

    findById: (res, table, id)=> {
        con.execute(
            `SELECT * FROM ${table}, WHERE ${table}_id = ?;`,
            [id],
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error:', error)
                }
            } 
        )
    },

    countAll: (res, table)=> {
        con.execute(
            `SELECT COUNT(*) count FROM ${table};`,
            (error, rows)=> {
                if(!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error: ', error)
                }
            }
        )
    }
}

module.exports = daoCommon 