require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");

const app = express();
const cors = require("cors");

const db = require("./db");

const queries = require("./queries");
const  {ObjectId}  = require("mongodb").ObjectId;
// const  ObjectID  = require("mongodb").ObjectID;

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
  let result
  res.send(req.params.id)
  try {
    const restaurantId = req.params.id;
    console.log(req.params.id);
    
    const database = db.client.db("projectdb");
    const restaurants = database.collection("restaurants");
    result = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
  } catch (err) {
    console.log(err);
    console.log("error!!!!!");

  }
  // console.log(result);
  res.json(result);
});

// get all reviews for restaurant
app.get("/api/restaurants/:id/reviews", async (req, res) => {
  const reataurantID = req.params.id;
  const reviews = await queries.getAllReviews(reataurantID);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
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
    const result = await db.query("delete from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = 3010;



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
