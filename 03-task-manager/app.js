const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");

// of the secret key
require("dotenv").config();

// Middleware
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = 3000;

const startServer = async () => {
  try {
    // to the dataDB
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}....`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();

// app.get('/api/v1/tasks')  - get all the tasks
// app.post("/api/v1/task")  - create a new tasks
// app.get("/api/v1/task:id")  - get single tasks
// app.patch("/api/v1/task:id")  - update tasks
// app.delete("/api/v1/task:id")  - delete tasks
