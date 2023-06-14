const db = require("./db");

async function getAllRestaurants() {
  try {
    const statment = `
  SELECT 
    restaurants.id,
    restaurants.name,
    restaurants.location,
    restaurants.price_range,
    trunc(avg(reviews.rating))::int as avg_rating,
    count(reviews.id)::int as review_count
  FROM
    restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
  GROUP BY
    restaurants.id;`;
    const results = await db.query(statment);
    console.log(results);
    return results.rows;
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

module.exports.getAllRestaurants = getAllRestaurants;
module.exports.getAllReviews = getAllReviews;
module.exports.createOneReview = createOneReview;
