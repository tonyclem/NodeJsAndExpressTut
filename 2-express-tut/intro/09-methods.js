const express = require("express");
const morgan = require("morgan");
const app = express();
let { people } = require("./data");

app.use(morgan("tiny"));

// Static assets
app.use(express.static("./methods-public"));

// Parse form data
app.use(express.urlencoded({ extended: false }));
// Parse JSON data
app.use(express.json());
// Get all people
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
// post the new person request and open a new page /api/people
app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  // to sent data to postman
  res.status(201).send({ success: true, data: [...people, name] });
});

// post request and response to  new page /login
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credential"); // send back a response
});

// update the person and open a new page /api/people/:id
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === Number(id));
  // if the person is not found return a 404
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No person found with is id ${id}` });
  }

  // this to is to update the person and send back the new person list
  const newPerson = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPerson });
});

// Delete a person by id and return the updated list
app.delete("/api/people/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  // this is to delete the person and send back the new person list
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listing on port 5000......");
});
