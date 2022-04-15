const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World is Clement");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

// app.get('/api/v1/tasks')  - get all the tasks
// app.post("/api/v1/task")  - create a new tasks
// app.get("/api/v1/task:id")  - get single tasks
// app.patch("/api/v1/task:id")  - update tasks
// app.delete("/api/v1/task:id")  - delete tasks
