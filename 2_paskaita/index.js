const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const cars = [{
    id: 1,
    make: "BMW",
    model: "530",
    color: "red"
}, 
{
    id: 2,
    make: "Audi",
    model: "A3",
    color: "Purple"
},
{
  id: 3,
  make: "VW",
  model: "Jetta",
  color: "Black"
}
];

app.get("/cars", (req, res) => {
    res.send(cars);
})

app.get("/cars/:id", (req, res) => {
    const id = +req.params.id;  
    const car = cars.find((car) => car.id === id);      
    if (car) {  
      res.send(car);  
    } else {  
      res.status(400).send({  
        error: "Car not found",  
      });  
    }  
  });

app.delete("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  if(car) {
    const index = cars.indexOf(car);
    cars.splice(index, 1);
    res.send({
      message: "Car was deleted succesfully"
    });
  } else {
    res.status(404).send({
      error: "Car not found",
    });
  }
})

app.put("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const newCar = cars.find((car) => car.id === id);
  if(car) {
  const updatedCar = { ...car, ...newCar };
  const index = USERS.indexOf(car);
  cars.splice(index, 1, updatedCar);
  res.send({
    message: 'Car updated',
    body: {
      make: `${updatedCar.make}`,
      make: `${updatedCar.model}`,
      make: `${updatedCar.color}`,
    },
  });
  } else {
    res.status(404).send({ message: "User with given ID doesn't exist." });
  }
})

app.post("/cars", (req, res) => {
    const car = req.body;
    console.log(car);
    if(car.make && car.model && car.color) {
        const newCar = {...car, id: Date.now()}
        cars.push(newCar);
        res.send(newCar);
    } else {
      res.status(400).send({  
        error: "Car not found",  
      });  
    }  
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// const names = [`Alex`, `Rose`, `Megan`];

// app.get("/users/", (req, res) => {
//     res.send(names);
// })

// app.get(`/users/:firstLetter`, (req, res) => {
//     const firstLetter = req.params.firstLetter.toUpperCase();
//     const filter = (names, firstLetter) => names.filter(user => user.startsWith(firstLetter));
//     const result = filter(names, firstLetter);
//     res.send(result);
// })

// app.post('/users/', (req, res) => {
//     let newUser = req.body.name;
//     names.push(newUser);
//     console.log(names);
//     res.send(names);
// })

// app.listen(port, () => {
//     console.log(`Server is listening on localhost:${3000} port`)
// })

