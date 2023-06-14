import axios from "axios";

// Returns an HTTP client to handle requests (get/post/put/etc.) to the backend
// All requests are done with the baseURL defined 
export default axios.create({
  baseURL: "http://localhost:3010/api/restaurants",
});
