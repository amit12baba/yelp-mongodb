import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { ReviewsContext } from "../context/ReviewsContext";

const AddReview = () => {
  const { id } = useParams()
  const { addReview } = useContext(ReviewsContext);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [reviewText, setReviewText] = useState("");
  console.log({ name });
  console.log({ rating });
  console.log({ reviewText });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/reviews`, {
        name: name,
        rating: rating,
        review: reviewText,
      });
      console.log("222222")
      addReview(response.data);
      console.log("this is the response");
      console.log(response)

    } catch (err) {}
  };
 

  return (
    <div className="mb-2">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4 mt-3">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="Review">Review</label>
          <textarea
            id="Review"
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
