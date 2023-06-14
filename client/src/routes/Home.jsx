import React from "react";
import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
  return <div className="home">
    <Header/>
    <AddRestaurant/>
    <RestaurantList/>
  </div>;
};

export default Home;
