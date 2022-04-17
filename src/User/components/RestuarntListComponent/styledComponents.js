import styled from "styled-components";
import { Link } from "react-router-dom";

import tw from "twin.macro";

const colors = {
  resturantCardItemColor: `#000000`,
};

export const RestuarantList = styled.ul`
  ${tw`flex flex-wrap list-none m-0 p-0`};
  @media screen and (min-width: 768px) {
    ${tw`px-4 flex justify-center`}
  }
`;

export const RestuarantLink = styled(Link)`
  ${tw`no-underline`}
  @media screen and (max-width: 576px) {
    ${tw`w-full`}
  }
  @media screen and (min-width: 576px) and (max-width: 992px) {
    ${tw`w-1/2`}
  }
  @media screen and (min-width: 992px) {
    ${tw`w-1/3`}
  }
`;

export const RestuarantContainer = styled.li`
  ${tw`my-2 flex`};
  @media screen and (max-width: 768px) {
    ${tw` flex w-full my-2 px-1`};
  }
  color: ${colors.resturantCardItemColor};
`;

export const RestuarantImageContainer = styled.div`
  @media screen and (max-width: 768px) {
    ${tw`w-1/2`}
  }
  ${tw`flex items-center object-cover`}
`;

export const RestuarantImage = styled.img`
  ${tw`w-full rounded-lg`};
  @media screen and (max-width: 768px) {
    ${tw`h-4/6`}
  }
  @media screen and (min-width: 768px) {
    width: 200px;
    aspect-ratio: 2 / 1.6;
  }
`;

export const RestuarantTextContainer = styled.div`
  ${tw`px-2`}

  @media screen and (max-width : 768px) {
    ${tw`w-1/2`}
  }
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
