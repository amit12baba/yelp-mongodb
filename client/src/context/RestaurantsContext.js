import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  
  const addRestaurant = (restaurant) => {
    // restaurants = [1,2,3,4,5,6]
    // restaurant = 7
    // new_restaurants = [...restaurants, restaurant] = [1,2,3,4,5,6,7]
    console.log({restaurant})
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, addRestaurant, selectedRestaurant, setSelectedRestaurant }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
