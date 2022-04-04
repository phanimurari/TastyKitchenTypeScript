import { API_INITIAL } from "@ib/api-constants";
import { action, observable } from "mobx";
import RestaurantDetailsService from "../../services/restaurantDetailService/RestaurantDetailService";
import { restuarantsDataDetailsObjectType } from "../types";

class RestaurantDetailsStore {
  @observable restaurantDetails: restuarantsDataDetailsObjectType;
  @observable restaurantDetailsApiStatus: number;
  restaurantDetailsService: RestaurantDetailsService;

  constructor(restaurantDetailsService: RestaurantDetailsService) {
    this.restaurantDetails = {
      id: "",
      imageUrl: "",
      restuarantName: "",
      restuarantCusine: "",
      restuarantLocation: "",
      restuarantRating: 0,
      noOfReviews: 0,
      costForTwo: 0,
      itemsCount: 0,
    };
    this.restaurantDetailsApiStatus = API_INITIAL;
    this.restaurantDetailsService = restaurantDetailsService;
    this.init();
  }

  @action.bound init() {
    this.restaurantDetails = {
      id: "",
      imageUrl: "",
      restuarantName: "",
      restuarantCusine: "",
      restuarantLocation: "",
      restuarantRating: 0,
      noOfReviews: 0,
      costForTwo: 0,
      itemsCount: 0,
    };
  }

  @action.bound getRestuarantDetails = async () => {
    console.log("getRestuarantDetails");
  };
}

export default RestaurantDetailsStore;
