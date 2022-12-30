const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db.js');
const users = db.data;
 
app.use(cors());
app.use(express.json());
 
app.get("/data/", (req, res) => {
    res.send(db.data);
})

app.get("/data/:id", (req, res) => {
    const id = +req.params.id;
    const user = users.find((user) => user.id === id);
    if(user) {
        res.send(user);
    } else {
        res.send({
            error: "We couldn't find any user"
        })
    }
})

app.get("/email", (req, res) => {
    const emailsArr = [];
    users.forEach(user => {
        emailsArr.push(user.email);
    })
    res.send(emailsArr);
  });

  app.get("/genders/:gender", (req, res) => {
    const gender = req.params.gender; 
    const genderArr = [];      
    users.forEach(user => {
        if(gender === user.gender) {
            genderArr.push(`${user.first_name} ${user.last_name}`);
        }
    })
    res.send(genderArr);
  });

app.get("/data/:car", (req, res) => {
    const car = req.params.car;  
    const filteredCars = users.filter((user) => user.car === car);      
    if (filteredCars) {  
      res.send(filteredCars);  
    } else {  
      res.status(404).send({  
        error: "We couldn't find any users",  
      });  
    }  
  });
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})