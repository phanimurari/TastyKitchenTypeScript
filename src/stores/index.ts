import AuthAPIService from "../Authentication/login/services/authApiService";
import AuthStore from "../Authentication/login/store/authStore";
import CarouselApiService from "../User/services/carouselService/CarouselApiService";
import RestaurantDetailsService from "../User/services/restaurantDetailService/RestaurantDetailService";
import RestaurantsService from "../User/services/restaurantsService/RestaurantsService";
import { CarouselStore } from "../User/store/carouselStore/carouselStore";
import HomeStore from "../User/store/homeStore";
import RestaurantDetailsStore from "../User/store/restaurantDetailsStore/restaurantDetailsStore";
import RestaurantsStore from "../User/store/restaurantsStore/restaurantsStore";

const authService = new AuthAPIService();
const authStore = new AuthStore(authService);

const carouseService = new CarouselApiService()
const carouselStore = new CarouselStore(carouseService);

const homeStore = new HomeStore()

const restaurantsService = new RestaurantsService()
const restaurantsStore = new RestaurantsStore(restaurantsService)


const restaurantDetailsService = new RestaurantDetailsService()
const restaurantDetailsStore = new RestaurantDetailsStore(restaurantDetailsService)

export default {
  authStore,
  homeStore,
  carouselStore,
  restaurantsStore,
  restaurantDetailsStore
};
