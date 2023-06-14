import React from "react";

const StarRating = ({ rating }) => {
  // for example rating = 4 so the star is 4
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fas fa-star text-warning"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<i className="fas fa-star-half-alt text-warning"></i>)
    } else {
      stars.push(<i className="far fa-star text-warning"></i>);
    }
  }

  return <>{stars}</>;
};

export default StarRating;
