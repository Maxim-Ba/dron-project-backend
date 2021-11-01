const { Pool, Client } = require('pg')
import dotenv from 'dotenv'
dotenv.config()


const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})
// pool.query('SELECT NOW()', (err:any, res:any) => {
//   console.log(err, res)
//   pool.end()
// })


export {pool}