export interface carouselDataObjectType {
  id: number;
  image_url?: string;
  imageUrl?: string;
}

export interface userRatingTypes {
  rating_text?: string;
  rating_color?: string;
  total_reviews: number;
  rating: number;
}

export interface restaurantsType {
  id: number;
  name: string;
  user_rating: userRatingTypes;
  cuisine: string;
  image_url: string;
}

export interface restuarantsDataObjectType {
  id: string;
  name: string;
  cuisine: string;
  image_url: string;
  user_rating: userRatingTypes;
}

export interface userRatingCaseConvertedTypes {
  ratingText?: string;
  ratingColor?: string;
  totalReviews: number;
  rating: number;
}

export interface restuarantsDataObjectCaseConvertedType {
  id: string;
  name: string;
  cuisine: string;
  imageUrl: string;
  userRating: userRatingCaseConvertedTypes;
}

export interface restaurantsServicePropsTypes {
  offset: number;
  limit: number;
  sortBy: string;
}

export interface foodItemObjectTypes {
  name: string;
  cost: number;
  food_type: string;
  image_url: string;
  id: string;
  rating: number;
  quantity: number;
}

export interface restuarantsDataDetailsObjectType {
  id: string;
  imageUrl: string;
  restuarantName: string;
  restuarantCusine: string;
  restuarantLocation: string;
  restuarantRating: number;
  noOfReviews: number;
  costForTwo: number;
  itemsCount: number;
}
