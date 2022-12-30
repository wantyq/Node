require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {MongoClient, ObjectId, Db} = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("pets").collection("pets").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"})
  }
})

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("pets").collection("pets").insertOne({name: req.query.name, type: req.query.type, age: Number(req.query.age)})
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldn post that"})
  }
})

app.get("/pets/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const con = await client.connect();
    const data = await con
      .db("pets")
      .collection("pets")
      .find(type ? { type } : {})
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/petsage", async (req, res) => {
  const { age, sort, property } = req.query;
  try {
    const con = await client.connect();
    const data = await con
      .db("pets")
      .collection("pets")
      .find(age ? { age } : {})
      .sort(sort ? { [property]: sort === 'asc' ? 1 : -1 } : {})
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
