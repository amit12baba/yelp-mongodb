const { MongoClient } = require("mongodb");
const db = require("./db");

const { client } = require('./db');
const ObjectId = require("mongodb").ObjectId;


async function getAllRestaurants() {
  try {
    const restaurants = client.db("projectdb").collection("restaurants");

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
    const reviewsCollection = client.db("projectdb").collection("reviews");
    const query = { restaurant_id: restaurantID };
    const results = await reviewsCollection.find(query).toArray();
    return results;
  } catch (err) {
    console.log(err);
  }
}


async function createOneReview(restaurantID, name, rating, review) {
  try {
    const database = client.db("projectdb");
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
  const client = await connectMongo(); // Connect to MongoDB when the server starts

  try {
    const database = client.db("projectdb");
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

