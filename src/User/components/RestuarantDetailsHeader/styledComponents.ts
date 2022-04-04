import styled from "styled-components";

import tw from "twin.macro";

const colors = {
  headerBackgroundColor: "#3b3b3b",
  headerTextColor: "#ffffff",
};

export const StyledRestuarantDetailsHeader = styled.div`
  ${tw`h-1/3 flex justify-center items-center`}
  background-color: ${colors.headerBackgroundColor};
  color: ${colors.headerTextColor};
`;

export const ResturantDetailsImageContainer = styled.div`
  ${tw`w-2/5 flex justify-end`}
`;

export const ResturantDetailsImage = styled.img`
  ${tw`w-3/5 rounded-lg`}
`;

export const ResturantDetailsTextContainer = styled.div`
  ${tw` w-3/4 px-4`}
`;

export const ResturantName = styled.h1``;

export const ResturantHeaderPara = styled.p``;

export const RestaurantHighLightsContainer = styled.div`
  ${tw`flex`}
`;

export const HightLightIconContainer = styled.div`
  ${tw` mx-2`}
`;

export const HighLightIconText = styled.p`
  ${tw`mx-1`}
`;

export const InnerContainer = styled.div`
  ${tw`flex items-center `}
`;
