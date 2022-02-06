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
            [-1, 'admina', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@email.com', 'Admin', 'Novotny'],
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
    }
}


pgclient.connect(async err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')

        await pgclient.query('BEGIN');

        const queries = Object.values(querySets)
        for(let i = 0; i < queries.length; i += 1) {
            const {query, values, skip} = queries[i];
            if (skip) {continue}
            console.log(query);
            try {
                for(let j = 0; j < values.length; j += 1) {
                    await pgclient.query(query, values[j]);
                }
            } catch (err) {
                console.log(err);
                console.log('rollback');
                await pgclient.query('ROLLBACK');
                await pgclient.end();
                throw err;
            }
        }

        console.log('commit');
        await pgclient.query('COMMIT');

        pgclient.end();
    }

})