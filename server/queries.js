const db = require("./db");

const { client } = require('./db');
const ObjectId = require("mongodb").ObjectId;


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
        $addFields: {
          avg_rating: { $avg: "$reviews.rating" },

        }
      }
    ];

    const results = await restaurants.aggregate(pipeline).toArray();
    console.log("@@@@@@")
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}


async function getAllReviews(restaurantID) {
  try {
    const reviewsCollection = db.client.db("projectdb").collection("reviews");
    const query = { restaurant_id: restaurantID };
    const results = await reviewsCollection.find(query).toArray();
    return results;
  } catch (err) {
    console.log(err);
  }
}


async function createOneReview(restaurantID, name, rating, review) {
  try {
    const database = db.client.db("projectdb");
    const reviews = database.collection("reviews");
    const doc = {
      name: name,
      rating: rating,
      review: review,
      restaurant_id: new ObjectId(restaurantID)
    };
    const insertResult = await reviews.insertOne(doc);
    console.log({ insertResult })
    const result = await reviews.findOne({ _id: insertResult.insertedId });
    return result;
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
