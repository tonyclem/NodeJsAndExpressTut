const express = require("express");
const path = require("path");

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes all members
app.use("/api/members", require("./routes/api/members"));

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
