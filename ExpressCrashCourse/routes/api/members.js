const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../../members");

// Get all memebers
router.get("/", (req, res) => {
  res.json(members);
});

// Get single members
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.json({ message: `No members with this ID ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {
  res.send(req.body);
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

// Updating Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;

    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.json({ message: `No members with this ID ${req.params.id}` });
  }
});

module.exports = router;
