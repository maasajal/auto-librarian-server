const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://auto-e-librarian.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

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
    const borrowBooks = client.db("AutoLibrarianDB").collection("borrowBooks");

    app.get("/books", async (req, res) => {
      const cursor = booksCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Single id: ", id);
      const query = { _id: new ObjectId(id) };
      const book = await booksCollection.findOne(query);
      res.send(book);
    });

    app.get("/book-categories", async (req, res) => {
      const cursor = bookCategories.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/borrow-books", async (req, res) => {
      const cursor = borrowBooks.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/borrowed-books/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await borrowBooks.find(query).toArray();
      res.send(result);
    });

    app.patch("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $inc: { quantity: -1 },
      };
      const result = await booksCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.get("/books", async (req, res) => {
      const { category } = req.query;
      const filter = category ? { category } : {};
      const books = await booksCollection.find(filter).toArray();
      res.send(books);
    });

    app.post("/books", async (req, res) => {
      const newBook = req.body; // get new item from client site
      console.log("New Book", newBook);
      // insertOne item and send to database
      const result = await booksCollection.insertOne(newBook);
      res.send(result);
    });

    app.post("/borrow-books", async (req, res) => {
      const borrowBook = req.body; // get borrow item from client site
      console.log("Borrow Book", borrowBook);
      // insertOne item and send to database
      const result = await borrowBooks.insertOne(borrowBook);
      res.send(result);
    });

    app.put("/books/:id", async (req, res) => {
      const id = req.params.id;
      const book = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateBook = {
        $set: {
          ...book,
        },
      };
      const result = await booksCollection.updateOne(
        filter,
        updateBook,
        options
      );
      res.send(result);
    });

    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await booksCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/borrowed-books/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await borrowBooks.deleteOne(query);
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
