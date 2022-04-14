const express = require("express");
const router = express.Router();

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

// Get all people
router.get("/", getPeople);
// post the new person request and open a new page /api/people
router.post("/", createPerson);

router.post("/postman", createPersonPostman);
// put an item in the people array and update the name
router.put("/:id", updatePerson);

// Delete a person by id and return the updated list
router.delete("/:id", deletePerson);

module.exports = router;
