import { apiMethods } from "../../../common/constants/ApiConstants";
import { networkCallWithApisauce } from "../../../utils/apiUtils";

class RestaurantDetailsService {
  getRestaurantDetails(url: string) {
    return networkCallWithApisauce(url, apiMethods.get);
  }
}

export default RestaurantDetailsService;
