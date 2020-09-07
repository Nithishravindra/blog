const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB =
  "mongodb+srv://nithish:14j816LvpJhZr9zR@cluster0.xlkki.mongodb.net/blog?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = 4000;

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!.");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
