const express = require("express");
const path = require("path");

const app = express();

// this get all the element in public files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
