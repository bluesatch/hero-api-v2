const con = require('../../config/dbconfig')

const teamDao = {
    table: 'team',

    findHeroesByTeam: (res, table, team)=>{
        con.execute(
            `SELECT h.hero_id, h.hero_name, h.first_name,
            h.last_name, h.alias, f.franchise, s.species,
            h.place_of_origin, h.first_app, h.alignment, h.img_url
            FROM hero h
            JOIN franchise f USING (franchise_id)
            JOIN species s USING (species_id)
            JOIN hero_to_team ht ON h.hero_id = ht.hero_id
            JOIN team t ON ht.team_id = t.team_id
            WHERE t.team = '${team}'
            ORDER BY t.team_id;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`DAO Error: ${table} `, error)
                }
            }
        )
    }
}

module.exports =  teamDao