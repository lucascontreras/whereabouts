require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
//get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.status(200).json({
      status: 'success',
      results: rows.length, //good practice for apis
      data: {
        users: rows
      }
    });
  }
  catch (err) {
    console.log(err); //improve error handling
  }
});

//get a user
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [req.params.id]
    }
    const { rows } = await db.query(query);

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        user: rows[0]
      }
    });
  }
  catch(err) {
    console.log(err); //improve error handling
  }
});

//create a user
app.post('/api/v1/users', async (req, res) => {
  try {
    const query = {
      text: 'INSERT INTO users (name, phone_number, password) VALUES ($1, $2, $3) RETURNING *',
      values: [req.body.name, req.body['phone_number'], req.body.password]
    }
    const { rows } = await db.query(query);
    res.status(201).json({ //201 status --> created
      status: 'success',
      data: {
        user: rows[0]
      }
    });
  }
  catch(err) {
    console.log(err); //improve error handling
  }
});

//delete user
app.delete('/api/v1/users/:id', async (req, res) => {
  try {
    const query = {
      text: 'DELETE FROM users WHERE id = $1',
      values: [req.params.id]
    }
    const results = await db.query(query)
    res.status(204).json({ //204 --> no content
      status: 'success'
    });
  }
  catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});