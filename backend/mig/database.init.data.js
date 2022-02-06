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
            [-1, 'admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@email.com', 'Admin', 'Novotny'],
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
    insertExampleTest: {
        query: 'insert into test(id, "timeLimit", "closed") values($1, $2, $3)',
        values: [
            [-1, 5400, true],
        ]
    }
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