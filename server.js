// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// // const MongoClient = require('mongodb').MongoClient
// const mongoose = require("mongoose");

// // var db

// // Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password!
// // MongoClient.connect('mongodb://YOUR_USERNAME:YOUR_PASSWORD@ds047955.mongolab.com:47955/star-wars-quotes', (err, database) => {
// //   if (err) return console.log(err)
// //   db = database.db('star-wars-quotes')
// //   app.listen(process.env.PORT || 3000, () => {
// //     console.log('listening on 3000')
// //   })
// // })
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/CRUD")
// //   .then(() => {
// //     console.log("Database Connected");
// //   })
// //   .catch((err) => {
// //     console.log(err.message);
// //   });

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   db.collection("quotes")
//     .find()
//     .toArray((err, result) => {
//       if (err) return console.log(err);
//       res.render("index.ejs", { quotes: result });
//     });
// });

// app.post("/quotes", (req, res) => {
//   db.collection("quotes").save(req.body, (err, result) => {
//     if (err) return console.log(err);
//     console.log("saved to database");
//     res.redirect("/");
//   });
// });

// app.put("/quotes", (req, res) => {
//   db.collection("quotes").findOneAndUpdate(
//     { name: "Yoda" },
//     {
//       $set: {
//         name: req.body.name,
//         quote: req.body.quote,
//       },
//     },
//     {
//       sort: { _id: -1 },
//       upsert: true,
//     },
//     (err, result) => {
//       if (err) return res.send(err);
//       res.send(result);
//     }
//   );
// });

// app.delete("/quotes", (req, res) => {
//   db.collection("quotes").findOneAndDelete(
//     { name: req.body.name },
//     (err, result) => {
//       if (err) return res.send(500, err);
//       res.send("A darth vadar quote got deleted");
//     }
//   );
// });

// mongoose
//   .connect("mongodb://127.0.0.1:27017/crud", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB database: crud");
//     app.listen(3000, () => {
//       console.log("Server is running on http://localhost:3000");
//     });
//   })
//   .catch((err) => console.log("Error connecting to MongoDB:", err));


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database: crud");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Mongoose Schema & Model
const quoteSchema = new mongoose.Schema({
  name: String,
  quote: String,
});
const Quote = mongoose.model("Quote", quoteSchema);

// Routes
app.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.render("index.ejs", { quotes });
  } catch (err) {
    res.status(500).send("Error fetching quotes: " + err.message);
  }
});

app.post("/quotes", async (req, res) => {
  try {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    console.log("Saved to database");
    res.redirect("/");
  } catch (err) {
    res.status(400).send("Error saving quote: " + err.message);
  }
});

app.put("/quotes", async (req, res) => {
  try {
    const updatedQuote = await Quote.findOneAndUpdate(
      { name: "Yoda" }, // Example: Updating Yoda's quote
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      { new: true, upsert: true }
    );
    res.json(updatedQuote);
  } catch (err) {
    res.status(400).send("Error updating quote: " + err.message);
  }
});

app.delete("/quotes", async (req, res) => {
  try {
    const result = await Quote.findOneAndDelete({ name: req.body.name });
    if (result) {
      res.send("Quote deleted successfully");
    } else {
      res.status(404).send("Quote not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting quote: " + err.message);
  }
});
