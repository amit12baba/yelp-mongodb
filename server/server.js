require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");

const app = express();
const cors = require("cors");

const db = require("./db");

const queries = require("./queries");

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
  console.log(req.params.id);
  let result = null;
  try {
    const sql = "db.restaurants.find({id : req.params.id})";
    // const sqlParams = [req.params.id];

    console.log(sql);
    result = await db.query(sql);
  } catch (err) {
    console.log(err);
    console.log("error!!!!!");
  }
  console.log(result.rows[0]);

  res.json(result.rows[0]);
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
  try {
    const result = await collection.insertMany(
      {name: req.body.name, location: req.body.location }
      // [req.body.name, req.body.location, req.body.price_range]
    );
    console.log({result});
    res.json(result);
  } catch (err) {
    console.log(err);
  }
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
