import { restuarantsDataObjectType } from "../types";

class RestaurantModel {
  id;
  name;
  cuisine;
  imageUrl;
  userRating;
  constructor(restuarantsDataObject: restuarantsDataObjectType) {
    (this.id = restuarantsDataObject.id),
      (this.name = restuarantsDataObject.name),
      (this.cuisine = restuarantsDataObject.cuisine),
      (this.imageUrl = restuarantsDataObject.image_url),
      (this.userRating = {
        totalReviews: restuarantsDataObject.user_rating.total_reviews,
        rating: restuarantsDataObject.user_rating.rating,
      });
  }
}

export { RestaurantModel };
