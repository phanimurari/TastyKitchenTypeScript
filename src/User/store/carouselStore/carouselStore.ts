import { API_FAILED, API_FETCHING, API_INITIAL, API_SUCCESS } from "@ib/api-constants"
import { action, observable } from "mobx"
import { statusCodes } from "../../../common/constants/ApiConstants"
import CarouselApiService from "../../services/carouselService/CarouselApiService"
import { carouselDataObjectType } from "../types"
import { CarouselModel } from "./carouselModel"

class CarouselStore {
    @observable carouselData: Array<CarouselModel>
    @observable carouselApiStatus: number
    carouselService: CarouselApiService

    constructor(carouselService: any) {
        this.carouselService = carouselService
        this.carouselApiStatus = API_INITIAL
        this.carouselData = []
        this.init()
    }

    @action.bound init() {
        this.carouselData = []
    }

    @action.bound getCarouselData = async () => {

        this.carouselApiStatus = API_FETCHING

        const userCarouselPromise = this.carouselService.getCarousel()

        const fetchResponse = await userCarouselPromise.then((response: any) => {
            return response.json();
        });

        if (fetchResponse.status_code === statusCodes.badRequestErrorCode) {
            this.setCarouselApiError();
        } else {
            this.setCarouselApiResponse(fetchResponse);
        }
    }

    @action.bound setCarouselApiError() {
        this.carouselApiStatus = API_FAILED
    }

    @action.bound setCarouselApiResponse(response: { offers: Array<carouselDataObjectType> }) {
        this.carouselApiStatus = API_SUCCESS
        this.carouselData = response.offers.map(carouselItem => new CarouselModel(carouselItem))
    }

}


export { CarouselStore }