import styled from "styled-components";
import tw from "twin.macro";

export const CartItemContainer = styled.li`
  ${tw`flex m-2`}
`;

export const CartItemImageContainer = styled.div`
  ${tw`flex w-1/3 items-center`}
`;

export const CartImage = styled.img`
  ${tw`w-40 h-36 rounded-xl`}
`;

export const CartItemName = styled.p`
  ${tw`text-lg font-medium mx-2`}
`;

export const QuantityContainer = styled.div`
  ${tw`flex items-center w-1/3`}
`;

export const ItemQuantity = styled.p`
  ${tw`mx-2`}
`;

export const ItemPriceContainer = styled.div`
  ${tw`flex items-center mx-2`}
`;

export const ItemPrice = styled.p``;
