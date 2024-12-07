import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passwords';
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

await client.connect();
const db = client.db(dbName);


// get password
app.get('/',  async(req, res) => {
  const db = client.db(dbName);
  const usersCollection = db.collection('users');
  const users = await usersCollection.find().toArray();
  res.json(users);
})

// save password
app.post('/',  async(req, res) => {
   
    const password = req.body;
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const users = await usersCollection.insertOne(password);
    res.send({success: true , user_data: users});
    })


    app.delete('/',  async(req, res) => {
   
      const password = req.body;
      const db = client.db(dbName);
      const usersCollection = db.collection('users');
      const users = await usersCollection.deleteOne(password);
      res.send({success: true , result: users});
      })
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
}) 