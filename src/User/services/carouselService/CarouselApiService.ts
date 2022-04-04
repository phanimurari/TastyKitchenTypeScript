import { apiMethods } from "../../../common/constants/ApiConstants";
import { networkCallWithApisauce } from "../../../utils/apiUtils";

const url = "https://apis.ccbp.in/restaurants-list/offers";


class CarouselApiService {
    api: string;
    constructor() {
        this.api = url;
    }

    getCarousel() {
        return networkCallWithApisauce(url, apiMethods.get)
    }
}

export default CarouselApiService;
