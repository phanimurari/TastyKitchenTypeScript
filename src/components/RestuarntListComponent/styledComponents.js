import styled from "styled-components";
import { Link } from "react-router-dom";

import tw from "twin.macro";

const colors = {
  resturantCardItemColor: `#000000`,
};

export const RestuarantList = styled.ul`
  ${tw`flex flex-wrap list-none`}
`;

export const RestuarantLink = styled(Link)`
  ${tw`no-underline`}
`;

export const RestuarantContainer = styled.li`
  ${tw`p-2 flex items-center justify-center drop-shadow-2xl`}
  color: ${colors.resturantCardItemColor}
`;

export const RestuarantImageContainer = styled.div`
  ${tw`flex items-center`}
`;

export const RestuarantImage = styled.img`
  ${tw`w-64 h-48 rounded-lg`}
`;

export const RestuarantTextContainer = styled.div`
  ${tw`px-6`}
`;

export const RestuarantHeading = styled.h1`
  ${tw`text-xl`}
`;

export const RestuarantCuisineType = styled.p``;

export const RestaurantRatingsAndReviewsContainer = styled.div`
  ${tw`flex justify-start items-center`}
`;

export const RestaurantRatings = styled.div``;

export const RestaurantNumberOfReviews = styled.p``;
