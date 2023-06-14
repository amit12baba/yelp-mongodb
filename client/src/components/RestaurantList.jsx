import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = () => {
  // useContext is being used to allow sharing the same "state" with the AddRestaurants
  // restaurants have all the data, while setRestaurants is a function used to update the restaurants variable
  // when react indicate that the restaurants are changed, it automatically refresh the component
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  // const returnObject = useContext(RestaurantsContext); === {retaurants: [...], setRestaurants: ()=>{}, addRestaurant: () => {}}
  // const restaurants = returnObject.restaurants; === {setRestaurants: ..., ...}
  // const setRestaurants = returnObject.setRestaurants;

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data.restaurant);
        // Adding all the restaurants to the context state
        setRestaurants(response.data.data.restaurant);
      } catch (err) {}
    }
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {}
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    console.log({id})
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="list-group mt-4">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              console.log({restaurant});
              console.log(restaurant.id);
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>
                    <StarRating rating={restaurant.avg_rating} />
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
