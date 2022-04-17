import {
  API_FAILED,
  API_FETCHING,
  API_INITIAL,
  API_SUCCESS,
} from "@ib/api-constants";
import { action, observable } from "mobx";
import { statusCodes } from "../../../common/constants/ApiConstants";
import RestaurantDetailsService from "../../services/restaurantDetailService/RestaurantDetailService";
import {
  foodItemObjectTypes,
  restuarantsDataDetailsObjectType,
} from "../types";
import { FoodItemModel } from "./foodItemModel";

const restauartDetailsApiURL = "https://apis.ccbp.in/restaurants-list";

class RestaurantDetailsStore {
  @observable restaurantDetails: restuarantsDataDetailsObjectType;
  @observable restaurantDetailsApiStatus: number;
  @observable restaurantFoodItemsList: Array<foodItemObjectTypes>;
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
    this.restaurantFoodItemsList = [];
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

  @action.bound getRestuarantDetails = async (id: string) => {
    this.restaurantDetailsApiStatus = API_FETCHING;

    const url = `${restauartDetailsApiURL}/${id}`;

    const restaurantsPromise = this.restaurantDetailsService.getRestaurantDetails(
      url
    );

    const fetchResponse = await restaurantsPromise.then((response: any) =>
      response.json()
    );

    if (fetchResponse.status_code === statusCodes.badRequestErrorCode) {
      this.setRestaurantDetailsApiError();
    } else {
      this.setRestaurantDetailsApiResponse(fetchResponse);
    }
  };

  @action setRestaurantDetailsApiError = () => {
    this.restaurantDetailsApiStatus = API_FAILED;
  };

  @action setRestaurantDetailsApiResponse = (response: any) => {
    this.restaurantDetailsApiStatus = API_SUCCESS;

    const caseConvertedResturantDetailsData = {
      id: response.id,
      imageUrl: response.image_url,
      restuarantName: response.name,
      restuarantCusine: response.cuisine,
      restuarantLocation: response.location,
      restuarantRating: response.rating,
      noOfReviews: response.reviews_count,
      costForTwo: response.cost_for_two,
      itemsCount: response.items_count,
    };

    const dataFromLocalStorage = localStorage.getItem("resturantSpecificData");

    const caseConvertedFoodItemsData = response.food_items.map(
      (item: foodItemObjectTypes) => new FoodItemModel(item)
    );

    if (dataFromLocalStorage !== null) {
      const itemsDataFromLocalStorage = JSON.parse(dataFromLocalStorage)
        .itemsData;
      const updateFetchedDataQuantity = caseConvertedFoodItemsData.map(
        (fetchedItem: foodItemObjectTypes) => {
          itemsDataFromLocalStorage.find(
            (itemInLocalStorage: foodItemObjectTypes) => {
              if (itemInLocalStorage.id === fetchedItem.id) {
                fetchedItem.quantity = itemInLocalStorage.quantity;
              }
            }
          );
          return fetchedItem;
        }
      );
      this.restaurantDetails = caseConvertedResturantDetailsData;
      this.restaurantFoodItemsList = updateFetchedDataQuantity;
    } else {
      this.restaurantDetails = caseConvertedResturantDetailsData;
      this.restaurantFoodItemsList = caseConvertedFoodItemsData;
    }
  };
}

export default RestaurantDetailsStore;
