import styled from "styled-components";
import tw from "twin.macro";

export const CartItemsTableHeader = styled.li`
  ${tw`flex`}
`;

export const CartItemTableText = styled.p`
  ${tw`w-1/3`}
`;

export const CartItemsListContainer = styled.div`
  ${tw`bg-gray-100 flex flex-col px-2 rounded-lg list-none h-4/6`}
`;

export const CartItemsFooterContainer = styled.li`
  ${tw`flex w-4/5 justify-between`}
`;

export const CartItemFooterText = styled.p``;

export const TotalCartPriceContainer = styled.div`
  ${tw``}
`;

export const TotalPriceText = styled.p``;

export const PriceAndIconContainer = styled.div`
  ${tw`flex items-center`}
`;
