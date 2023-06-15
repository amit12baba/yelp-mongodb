const db = require("./db");

const { client } = require('./db');

// Now you can use the `client` variable here
// console.log({client});


async function getAllRestaurants() {
  try {
    const restaurants = db.client.db("projectdb").collection("restaurants");

    const pipeline = [
      {
        $lookup:
        {
            from: "reviews",
            localField: "_id",
            foreignField: "restaurant_id",
            as: "reviews"
        }
    },
    {
        "$addFields": {
            "avg_rating": {
                "$avg": "$reviews.rating"
            }
        }
    }
    ];

    const results = await restaurants.aggregate(pipeline).toArray();
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}


async function getAllReviews(restaurantID) {
  try {
    const sql = "select * from reviews where restaurant_id = $1";
    const sqlParams = [restaurantID];
    console.log(restaurantID);
    const results = await db.query(sql, sqlParams);
    console.log(results);
    return results.rows;
  } catch (err) {
    console.log(err);
  }
}

async function createOneReview(restaurantID, name, rating, review) {
  try {
    const sql =
      "insert into reviews (name, rating, review, restaurant_id) values ($1,$2,$3,$4) returning *";
    const sqlParams = [name, rating, review, restaurantID];
    console.log(restaurantID);
    const results = await db.query(sql, sqlParams);
    console.log({ rows: results.rows });
    return results.rows[0];
  } catch (err) {
    console.log(err);
  }
}


async function createRestaurant(req) {
  try {
    const database = db.client.db("projectdb");
    const restaurants = database.collection("restaurants");
    // create a document to insert
    const doc = {
      name: req.body.name, location: req.body.location, price_range: req.body.price_range,
    }
    const insertResult = await restaurants.insertOne(doc);
    console.log({ insertResult })
    const result = await restaurants.findOne({ _id: insertResult.insertedId });
    return (result)
  } finally {
    await client.close();
  }
}



module.exports.getAllRestaurants = getAllRestaurants;
module.exports.getAllReviews = getAllReviews;
module.exports.createOneReview = createOneReview;
module.exports.createRestaurant = createRestaurant;
