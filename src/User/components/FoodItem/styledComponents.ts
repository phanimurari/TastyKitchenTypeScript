import styled from "styled-components";
import tw from "twin.macro";

export const FoodItemContainer = styled.li`
  ${tw`w-96 m-4 flex`}
`;

export const FoodItemImageContainer = styled.div`
  ${tw`flex items-center`}
`;
export const FoodItemTextContainer = styled.div`
  ${tw`px-6`}
`;

export const FoodItemImage = styled.img`
  ${tw`w-64 h-48 rounded-lg`}
`;

export const FoodItemHeading = styled.h1`
  ${tw`text-xl`}
`;

export const FoodItemIconContainer = styled.div`
  ${tw`flex items-center`}
`;

export const FoodItemPara = styled.p``;

export const FoodItemsButtonsContainer = styled.div`
  ${tw`flex items-center`}
`;

export const ItemsQuantityText = styled.p`
  ${tw`mx-2`}
`;
