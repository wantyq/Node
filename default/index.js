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








// app.get('/posts', async (req, res) => {
//     try {
//         const con = await client.connect(); // prisijungimas prie DB
//         const data = await con.db('newtask').collection("posts").find().toArray(); // duomenu istraukimas
//         await con.close(); // prisijungimo isjungimas
//         res.send(data);
//     } catch (error) {
//         res.status(500).send({error});
//     }
// });

// app.get("/posts/:id", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con.db('newtask').collection("posts").find().toArray();
//     await con.close();
//     const id = req.params.id;
//     const chosenUser = data.find((user) => user.id === id);
//     if (chosenUser) {
//       res.send(chosenUser);
//     } else {
//       res.send({
//         message: "We couldn't find any user"
//       })
//     }
//   } catch (error) {
//     res.status(500).send({error: "We couldn't find any user"});
//   }
// })


// app.post('/posts', async (req, res) => {
//     try {
//       const con = await client.connect();  
//       const data = await con.db('newtask').collection('posts').insertOne({_id: req.query._id, id: req.query.id, title: req.query.title, body: req.query.body})
//       await con.close();  
//       res.send(data);  
//     } catch (error) { 
//       res.status(500).send({error: "We couldn't do anything"}); 
//     } 
//   });

// app.delete("/posts/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const con = await client.connect();
//     const data = await con.db("newtask").collection("posts").deleteOne({id: id});
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({error: "We couldn't do that"});
//   }
// })

// app.put("/posts/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const con = await client.connect();
//     const data = await con.db("newtask").collection("posts").updateMany({id: id},
//       {$set: {title: req.query.title, body: req.query.body}})
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({error: "We couldn't update any item"})
//   }
// })

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});



// kitas taskas