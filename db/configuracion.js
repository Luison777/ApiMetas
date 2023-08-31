const initOptions={};
const pgp = require('pg-promise')(initOptions);

const cn={
    user: 'postgres',
    password: 'Lapf80204318',
    host: '127.0.0.1',
    port: 5432,
    database:'postgres',
};

const db = pgp(cn);

module.exports=db;