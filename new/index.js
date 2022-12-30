require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;


app.use(cors());
app.use(express.json());

app.post("/api/fill", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // const newData = await response.json();
    let usersArr = [];
    newData.forEach((user) => {

    })
    // const newName = newData.results[0].name.first;
    const con = await client.connect();
    // const data = await con.db("people").collection("names").insertOne({name: newName});

    const showCon = await client.connect();
    const showData = await showCon.db("people").collection("names").find().toArray();
    await con.close();
    res.send(showData);
  } catch (error) {
    res.status(500).send({error: "we couldnt do that"})
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("users_db").collection("user").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("users_db").collection("user").insertOne({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});