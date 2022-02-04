//TypeORM is expecting file named ormconfig.js
// DONT FORGET to rename edited file


module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: true,
    entities: [
        "./src/**/*.entity.ts"
    ],
    synchronize: true
}




