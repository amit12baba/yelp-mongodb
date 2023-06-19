import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { ReviewsContextProvider } from "../context/ReviewsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  let navigate = useNavigate();

  const handleHomePage = (e) => {
    e.stopPropagation();
    navigate(`/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.result);
      } catch (err) {}
    };
    fetchData();
  }, []);
  return (
    <ReviewsContextProvider>
      <div>
        {selectedRestaurant && (
          <>
            <div>
              <body>
                <button type="button"
                  onClick={(e) => handleHomePage(e)}
                  className="btn btn-outline-dark"
                >
                  Home
                </button>
              </body>
            </div>
            <h1 className="text-center display-1">{selectedRestaurant.name}</h1>

            <div className="mt-3">
              <Reviews id={id} />
            </div>

            <AddReview />
          </>
        )}
      </div>
    </ReviewsContextProvider>
  );
};

export default RestaurantDetailPage;
