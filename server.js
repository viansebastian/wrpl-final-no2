const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const supervisorsResult = await pool.query('SELECT * FROM supervisors');
    const studentsResult = await pool.query('SELECT * FROM students');
    const proposalsResult = await pool.query('SELECT * FROM proposals');
    
    const data = {
      supervisors: supervisorsResult.rows,
      students: studentsResult.rows,
      proposals: proposalsResult.rows
    };
    
    res.render('index', data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
