import { API_FAILED, API_FETCHING, API_INITIAL, API_SUCCESS } from "@ib/api-constants"
import { action, observable, computed } from "mobx"
import { statusCodes } from "../../../common/constants/ApiConstants"
import RestaurantsService from "../../services/restaurantsService/RestaurantsService"
import { restuarantsDataObjectType } from "../types"
import { RestaurantModel } from "./restaurantModel"

class RestaurantsStore {

    @observable restuarantsData: Array<RestaurantModel>
    @observable restaurantsApiStatus: number
    @observable numberOfRestaurants: number
    restaurantsService: RestaurantsService

    constructor(restaurantsService: RestaurantsService) {
        this.restuarantsData = []
        this.restaurantsApiStatus = API_INITIAL
        this.numberOfRestaurants = 0
        this.restaurantsService = restaurantsService
        this.init()
    }

    @action.bound init() {
        this.restuarantsData = []
    }

    @action.bound getRestuarants = async (offset: number, limit: number, sortBy: string) => {

        this.restaurantsApiStatus = API_FETCHING

        const getPopularRestauartsApiURL = "https://apis.ccbp.in/restaurants-list";
        const url = `${getPopularRestauartsApiURL}?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
        const restaurantsPromise = this.restaurantsService.getRestaurants(url)

        const fetchResponse = await restaurantsPromise.then((response: any) => response.json());

        if (fetchResponse.status_code === statusCodes.badRequestErrorCode) {
            this.setRestaurantsApiError();
        } else {
            this.setRestaurantsApiResponse(fetchResponse);
        }
    }

    @action.bound setRestaurantsApiError = () => {
        this.restaurantsApiStatus = API_FAILED
    }

    @action.bound setRestaurantsApiResponse = (response: { restaurants: Array<restuarantsDataObjectType>, total: number }) => {

        this.restaurantsApiStatus = API_SUCCESS
        this.restuarantsData = response.restaurants.map(restuarantItem => new RestaurantModel(restuarantItem))
        this.getNumberOfRestaurants(response.total)
    }

    @action.bound getNumberOfRestaurants(numberOfRestaurants: number) {
        this.numberOfRestaurants = numberOfRestaurants
    }


}


export default RestaurantsStore