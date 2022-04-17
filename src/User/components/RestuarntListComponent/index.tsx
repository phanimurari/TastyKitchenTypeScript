import { FaStar } from "react-icons/fa";
import { RESTAURANT_DETAILS } from "../../../common/constants/routePathConstants";
import { restuarantsDataObjectCaseConvertedType } from "../../store/types";

import {
  RestaurantNumberOfReviews,
  RestaurantRatings,
  RestaurantRatingsAndReviewsContainer,
  RestuarantContainer,
  RestuarantCuisineType,
  RestuarantHeading,
  RestuarantImage,
  RestuarantImageContainer,
  RestuarantLink,
  RestuarantList,
  RestuarantTextContainer,
} from "./styledComponents";

interface userRatingTypes {
  rating_text: string;
  rating_color: string;
  total_reviews: number;
  rating: number;
  totalReviews: number;
}

interface RestuarntListComponentTypes {
  restuarantsData: Array<restuarantsDataObjectCaseConvertedType>;
}

const restaurantCardText = {
  ratings: "ratings",
};

const restuarantPath = "/restaurants-list/";

const RestuarntListComponent = (props: RestuarntListComponentTypes) => {
  const { restuarantsData } = props;

  return (
    <RestuarantList>
      {restuarantsData.map(
        (restaurant: restuarantsDataObjectCaseConvertedType) => {
          const { id, name, cuisine, userRating, imageUrl } = restaurant;

          return (
            <RestuarantLink key={id} to={`${RESTAURANT_DETAILS}${id}`}>
              <RestuarantContainer>
                <RestuarantImageContainer>
                  <RestuarantImage src={imageUrl} />
                </RestuarantImageContainer>
                <RestuarantTextContainer>
                  <RestuarantHeading>{name}</RestuarantHeading>
                  <RestuarantCuisineType>{cuisine}</RestuarantCuisineType>
                  <RestaurantRatingsAndReviewsContainer>
                    <RestaurantRatings>
                      <FaStar />
                      {userRating.rating}
                    </RestaurantRatings>
                    <RestaurantNumberOfReviews>
                      ({userRating.totalReviews} {restaurantCardText.ratings})
                    </RestaurantNumberOfReviews>
                  </RestaurantRatingsAndReviewsContainer>
                </RestuarantTextContainer>
              </RestuarantContainer>
            </RestuarantLink>
          );
        }
      )}
    </RestuarantList >
  );
};

export default RestuarntListComponent;
