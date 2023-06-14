import React, { useState } from "react";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      console.log("=============================================")
      console.log({new_restaurant: response})
      addRestaurant(response.data);
      console.log(response);
    } catch (err) {}
  };

  return (
    <form className="row g-4" onSubmit={handleSubmit}>
      <div className="form-group col-sm-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Name"
        ></input>
      </div>
      <div className="form-group col-sm-4">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Location"
        ></input>
      </div>
      <div className="form-group col-sm-2">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="form-control"
          id="inputGroupSelect02"
          defaultValue=""
        >
          <option disabled>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary col-auto"
      >
        Add
      </button>
    </form>
  );
};

export default AddRestaurant;
