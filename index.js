const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Auto Librarian, a LearnEdge e-Library!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jd9hrzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Create database and collection as table
    const booksCollection = client.db("AutoLibrarianDB").collection("books");
    const bookCategories = client
      .db("AutoLibrarianDB")
      .collection("bookCategories");

    app.get("/books", async (req, res) => {
      const cursor = booksCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/book-categories", async (req, res) => {
      const cursor = bookCategories.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/books", async (req, res) => {
      const newBook = req.body; // get new item from client site
      console.log("New Book", newBook);
      // insertOne item and send to database
      const result = await booksCollection.insertOne(newBook);
      res.send(result);
    });

    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await booksCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Auto Librarian server running on port ${port}!`);
});
