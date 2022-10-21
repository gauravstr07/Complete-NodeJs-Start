const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmiter extends EventEmitter {}

const myEmiter = new MyEmiter();
myEmiter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  myEmiter.emit("log", "Log event emitted!");
}, 2000);
