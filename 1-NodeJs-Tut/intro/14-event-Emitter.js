const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register a listener for the 'event' event, with arguments
myEmitter.on("event", (name, id) => {
  console.log(`an event occurred! and Data is ${name} with ${id}`);
});

myEmitter.on("event", () => {
  console.log("Some other logic here");
});

// emit method is used to trigger the event.
myEmitter.emit("event", "kings", 5);

// Example II
const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`);
});

customEmitter.on("response", () => {
  console.log("some other logic here");
});

customEmitter.emit("response", "john", 34);
