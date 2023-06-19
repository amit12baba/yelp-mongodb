import React, { useEffect } from "react";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { ReviewsContext } from "../context/ReviewsContext";
import StarRating from "./StarRating";

const Reviews = (props) => {
  console.log({ props });
  const { reviews, setReviews } = useContext(ReviewsContext);
  console.log({ reviews });

  useEffect(() => {
    async function fetchData() {
      try {
        // http://localhost:3005/api/restaurants/1
        const response = await RestaurantFinder.get(`/${props.id}/reviews`);
        console.log("&&&&")
        console.log(response);
        // Adding all the restaurants to the context state
        setReviews(response.data.reviews);
      } catch (err) {}
    }
    fetchData();
  }, []);

  return (
    <div className="row row-cols-3 mb-2 gap-3">
      {reviews &&
        reviews.map((review) => {
          return (
            <div
              className="card text-white bg-primary mb-3 mr-4"
              style={{ maxWidth: "30%" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span>
                  <StarRating rating={review.rating} />
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
