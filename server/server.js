require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");

const app = express();
const cors = require("cors");

const db = require("./db");

const queries = require("./queries");
const { MongoClient } = require("mongodb");
// const  {ObjectId}  = require("mongodb").ObjectId;
const ObjectId = require("mongodb").ObjectId;

// translates body to json objects
app.use(express.json());
app.use(cors());

// GET all restaurants
app.get("/api/restaurants", async (req, res) => {
  const restaurants = await queries.getAllRestaurants();
  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurant: restaurants,
    },
  });
});

// GET a restaurant
app.get("/api/restaurants/:id", async (req, res) => {
  async function connectMongo() {
    try {
      const uri = 'mongodb://127.0.0.1:27017';
      const client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB');
      return client
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }
  const client = await connectMongo();
  let result
  // res.send(req.params.id)
  try {
    const restaurantId = req.params.id;
    console.log("this is the id" + req.params.id);

    const database = client.db("projectdb");
    const restaurants = database.collection("restaurants");

    const result = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    console.log("#####");
    console.log(result)
    res.json({ id: req.params.id, result });

  } catch (err) {
    console.log(err);
    console.log("error!!!!!");
    res.status(500).json({ error: "An error occurred" });
  }
});

// get all reviews for restaurant
app.get("/api/restaurants/:id/reviews", async (req, res) => {
  const reataurantID = req.params.id;
  const reviews = await queries.getAllReviews(reataurantID);
  console.log("%%%%")
  console.log(reviews)
  res.json({ reviews });

  // res.status(200).json({
  //   status: "success",
  //   results: reviews,
  //   data: reviews,
  // });
});

// creat a review
app.post("/api/restaurants/:id/reviews", async (req, res) => {
  console.log(req.body);
  const restaurantID = req.params.id
  const review = await queries.createOneReview(restaurantID, req.body.name, req.body.rating, req.body.review)
  res.status(200).json(review);
});


// Create (POST) a restaurant
app.post("/api/restaurants", async (req, res) => {
  console.log(req.body);
  const restaurant = await queries.createRestaurant(req)
  // console.log({restaurant})
  res.status(200).json(restaurant);
});

// Update restaurants
app.put("/api/restaurants/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const result = await db.query(
      "update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

// DELETE restaurants
app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const database = db.client.db("projectdb");
    const restaurants = database.collection("restaurants");

    const result = await restaurants.deleteOne({ _id: new ObjectId (restaurantId) });
    console.log(result)
    res.json(result);

  } catch (err) {
    console.log(err);
  }
});



const port = 3010;



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
