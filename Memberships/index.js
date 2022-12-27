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


app.get("/services", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("services").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"})
  }
})

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("users").aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service_id",
        }
      },
      {
        $project: {
          name: "$name",
          surname: "$surname",
          email: "$email",
          service_id: "$service_id.name",
        },
      },
    ]).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"})
  }
})

app.post("/services", async (req, res) => {
  try {
      const con = await client.connect();
      const data = await con.db("memberships").collection("services").insertOne({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        });
      await con.close();
      res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("users").insertOne({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        service_id: ObjectId(req.body.service_id)
      });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/services/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("services").deleteOne({ _id: ObjectId(`${id}`)});
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt delete any data"});
  }
})

app.get("/users/asc", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("users").aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service_id",
        }
      },
      {
        $project: {
          name: "$name",
          surname: "$surname",
          email: "$email",
          service_id: "$service_id.name",
        },
      },
      { $sort: { name: 1 } },
    ]).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.get("/users/desc", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("memberships").collection("users").aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service_id",
        }
      },
      {
        $project: {
          name: "$name",
          surname: "$surname",
          email: "$email",
          service_id: "$service_id.name",
        },
      },
      { $sort: { name: -1 } },
    ]).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({error: "We couldnt find any data"});
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});


