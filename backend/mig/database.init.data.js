const { Client } = require('pg');
const ormconfig = require('../ormconfig.js')

const pgclient = new Client({
    host: process.env.POSTGRES_HOST || ormconfig.host,
    port: process.env.POSTGRES_PORT || ormconfig.port,
    user: ormconfig.username,
    password: ormconfig.password,
    database: ormconfig.database
});


const querySets = {
    insertUsers: {
        query: "insert into account(id, username, password, email, firstname, surname) values($1, $2, $3, $4, $5, $6)",
        values: [
            [-1, 'admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@email.com', 'Adam', 'Novotny'],
        ]
    },
    initPermissionTypes: {
        query: 'insert into "permissionType" (id, name) values($1, $2)',
        values: [
            [1, 'admin'],
            [2, 'evaluator'],
            [3, 'creator'],
        ]
    },
    insertPermissions: {
        query: 'insert into permission(id, "typeId", "accountId") values($1, $2, $3)',
        values: [
            [-1, 1, -1],
        ]
    },
    insertGuarantees: {
        query: 'insert into guarantee(id, "accountId") values($1, $2)',
        values: [
            [-1, -1],
        ]
    },
    insertExampleTest: {
        query: 'insert into test(id, "timeLimit", "closed") values($1, $2, $3)',
        values: [
            [-1, 5400, true],
        ]
    },
    initQuestionTypes: {
        query: 'insert into "questionType"(id, type, "serverEvaluation") values($1, $2, $3)',
        values: [
            [1, 'singleChoice', true],
            [2, 'multipleChoice', true],
            [3, 'yesNo', true],
            [4, 'description', false],
            [5, 'ordering', false],
        ]
    },
    initCategories: {
        query: 'insert into category(id, name, "classMin", "classMax") values($1, $2, $3, $4)',
        values: [
            [1, 'A', 8, 9],
            [2, 'B', 10, 13],
        ]
    },
    initRoundTypes: {
        query: 'insert into "roundType"(id, name) values($1, $2)',
        values: [
            [1, 'skolni'],
        ]
    },
    initOlympiadYears: {
        query: 'insert into "olympiadYear"(id, name, year, description, "openToPublic", "registrationDeadline") values($1, $2, $3, $4, $5, $6)',
        values: [
            [-1, 'OYtestingOPENED', 2022, '', true, '2050-10-10'],
            [-2, 'OYtestingCLOSED', 2022, '', false, '2050-10-10'],
        ],
        // TODO Uncomment to not create 
        // skip: true,
    },
    initOlympiadRounds: {
        query: 'insert into "olympiadRound"(id, "roundStart", "roundEnd", "typeId", "yearId") values($1, $2, $3, $4, $5)',
        values: [
            [-1, '2020-10-10', '2050-10-10', 1, -1],
            [-2, '2020-10-10', '2050-10-10', 1, -2],
        ],
        // TODO Uncomment to not create 
        // skip: true,
    },
    initRegions: {
        query: 'insert into region(id, name) values($1, $2)',
        values: [
            [ 19, 'Hlavní město Praha' ],
            [ 27, 'Středočeský kraj' ],
            [ 35, 'Jihočeský kraj' ],
            [ 43, 'Plzeňský kraj' ],
            [ 51, 'Karlovarský kraj' ],
            [ 60, 'Ústecký kraj' ],
            [ 78, 'Liberecký kraj' ],
            [ 86, 'Královéhradecký kraj' ],
            [ 94, 'Pardubický kraj' ],
            [ 108, 'Kraj Vysočina' ],
            [ 116, 'Jihomoravský kraj' ],
            [ 124, 'Olomoucký kraj' ],
            [ 132, 'Moravskoslezský kraj' ],
            [ 141, 'Zlínský kraj' ]
        ]
    },
    initDistricts: {
        query: 'insert into district(id, name, "regionId") values($1, $2, $3)',
        values: [
            [ 3100, 'Hlavní město Praha', 19 ],
            [ 3201, 'Benešov', 27 ],
            [ 3202, 'Beroun', 27 ],
            [ 3203, 'Kladno', 27 ],
            [ 3204, 'Kolín', 27 ],
            [ 3205, 'Kutná Hora', 27 ],
            [ 3206, 'Mělník', 27 ],
            [ 3207, 'Mladá Boleslav', 27 ],
            [ 3208, 'Nymburk', 27 ],
            [ 3209, 'Praha-východ', 27 ],
            [ 3210, 'Praha-západ', 27 ],
            [ 3211, 'Příbram', 27 ],
            [ 3212, 'Rakovník', 27 ],
            [ 3301, 'České Budějovice', 35 ],
            [ 3302, 'Český Krumlov', 35 ],
            [ 3303, 'Jindřichův Hradec', 35 ],
            [ 3304, 'Pelhřimov', 108 ],
            [ 3305, 'Písek', 35 ],
            [ 3306, 'Prachatice', 35 ],
            [ 3307, 'Strakonice', 35 ],
            [ 3308, 'Tábor', 35 ],
            [ 3401, 'Domažlice', 43 ],
            [ 3402, 'Cheb', 51 ],
            [ 3403, 'Karlovy Vary', 51 ],
            [ 3404, 'Klatovy', 43 ],
            [ 3405, 'Plzeň-město', 43 ],
            [ 3406, 'Plzeň-jih', 43 ],
            [ 3407, 'Plzeň-sever', 43 ],
            [ 3408, 'Rokycany', 43 ],
            [ 3409, 'Sokolov', 51 ],
            [ 3410, 'Tachov', 43 ],
            [ 3501, 'Česká Lípa', 78 ],
            [ 3502, 'Děčín', 60 ],
            [ 3503, 'Chomutov', 60 ],
            [ 3504, 'Jablonec nad Nisou', 78 ],
            [ 3505, 'Liberec', 78 ],
            [ 3506, 'Litoměřice', 60 ],
            [ 3507, 'Louny', 60 ],
            [ 3508, 'Most', 60 ],
            [ 3509, 'Teplice', 60 ],
            [ 3510, 'Ústí nad Labem', 60 ],
            [ 3601, 'Havlíčkův Brod', 108 ],
            [ 3602, 'Hradec Králové', 86 ],
            [ 3603, 'Chrudim', 94 ],
            [ 3604, 'Jičín', 86 ],
            [ 3605, 'Náchod', 86 ],
            [ 3606, 'Pardubice', 94 ],
            [ 3607, 'Rychnov nad Kněžnou', 86 ],
            [ 3608, 'Semily', 78 ],
            [ 3609, 'Svitavy', 94 ],
            [ 3610, 'Trutnov', 86 ],
            [ 3611, 'Ústí nad Orlicí', 94 ],
            [ 3701, 'Blansko', 116 ],
            [ 3702, 'Brno-město', 116 ],
            [ 3703, 'Brno-venkov', 116 ],
            [ 3704, 'Břeclav', 116 ],
            [ 3705, 'Zlín', 141 ],
            [ 3706, 'Hodonín', 116 ],
            [ 3707, 'Jihlava', 108 ],
            [ 3708, 'Kroměříž', 141 ],
            [ 3709, 'Prostějov', 124 ],
            [ 3710, 'Třebíč', 108 ],
            [ 3711, 'Uherské Hradiště', 141 ],
            [ 3712, 'Vyškov', 116 ],
            [ 3713, 'Znojmo', 116 ],
            [ 3714, 'Žďár nad Sázavou', 108 ],
            [ 3801, 'Bruntál', 132 ],
            [ 3802, 'Frýdek-Místek', 132 ],
            [ 3803, 'Karviná', 132 ],
            [ 3804, 'Nový Jičín', 132 ],
            [ 3805, 'Olomouc', 124 ],
            [ 3806, 'Opava', 132 ],
            [ 3807, 'Ostrava-město', 132 ],
            [ 3808, 'Přerov', 124 ],
            [ 3809, 'Šumperk', 124 ],
            [ 3810, 'Vsetín', 141 ],
            [ 3811, 'Jeseník', 124 ]
        ]
    },
    initSchools: {
        query: 'insert into school(id, name, "districtId") values($1, $2, $3)',
        values: [
            [1, 'První české gymnázium v Karlových Varech', 3403],
            [2, 'Základní škola jazyků Karlovy Vary', 3403],
            [3, 'Gymnázium Paměti národa', 3100],
            [4, 'Gymnázium Jana Palacha Praha 1', 3100],
        ]
    },
    insertGuaranteeSchoools: {
        query: 'insert into "guarantee_schools_school"("guaranteeId", "schoolId") values($1, $2)',
        values: [
            [-1, 1],
            [-1, 2],
            [-1, 3],
            [-1, 4],
        ]
    },
}


pgclient.connect(async err => {
    if (err) {
        console.error('CONNECTION ERROR', err.stack)
    } else {
        console.log('CONNECTED')

        await pgclient.query('BEGIN');

        const queries = Object.values(querySets)
        for(let i = 0; i < queries.length; i += 1) {
            const {query, values, skip} = queries[i];
            if (skip) {continue}
            console.log(query);
            try {
                for(let j = 0; j < values.length; j += 1) {
                    console.log(`-${values[j]}`);
                    await pgclient.query(query, values[j]);
                }
            } catch (err) {
                console.log(err);
                console.log('ROLLBACK');
                await pgclient.query('ROLLBACK');
                await pgclient.end();
                throw err;
            }
        }

        console.log('COMMIT');
        await pgclient.query('COMMIT');

        pgclient.end();
    }

})