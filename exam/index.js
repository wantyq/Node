require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());


app.post("/api/fill", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const newData = await response.json();
    const conCheck = await client.connect();
    const dataCheck = await conCheck.db("users_db").collection("user").count({});
    if (dataCheck === 0) {
      newData.forEach(async (user) => {
        const con = await client.connect();
        const addAddress = await con.db("users_db").collection("address").insertOne({
          user: user.email,
          address: `${user.address.street} st., ${user.address.city}`,
          street: user.address.street,
          city: user.address.city
        })
        const addUser = await con.db("users_db").collection("user").insertOne({
          name: user.name,
          email: user.email
        })
      })
    }
    await con.close();
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

app.get("/api/users/names", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("users_db").collection("user").aggregate([{$project:{name:1}}]).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.get("/api/users/emails", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("users_db").collection("user").aggregate([{$project:{name:1,email:1}}]).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.get("/api/users/address", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("users_db").collection("user").aggregate([
      { $lookup:
          {
             from: "address",
             localField: "email",
             foreignField: "user",
             as: "address"
          }
      },
      { $project: {
        name: "$name",
        email: "$email",
        address: {city: "$address.city", street: "$address.street"},
      }},
  ]).toArray();
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
        name: req.query.name,
        email: req.query.email,
        address: req.query.address
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


