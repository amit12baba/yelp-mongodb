const { createContext, useState } = require("react");

export const ReviewsContext = createContext();

export const ReviewsContextProvider = (props) => {
    const [reviews, setReviews] = useState([]);
    
    const addReview = (review) => {
      console.log("^^^^")
      console.log({review})
      setReviews([...reviews, review]);
    };
  
    return (
      <ReviewsContext.Provider
        value={{ reviews, setReviews, addReview }}
      >
        {props.children}
      </ReviewsContext.Provider>
    );
  };