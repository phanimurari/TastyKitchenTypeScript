import styled from "styled-components";
import tw from "twin.macro";

export const PopularRestuarantsHeader = styled.div`
  ${tw`w-11/12 mx-auto flex flex-col justify-center`}
`;

export const Heading = styled.h1``;

export const DescriptionAndSelectContainer = styled.div`
  ${tw`flex justify-between`}
`;

export const Description = styled.p``;

export const SelectIconAndElementContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;

export const SelectElement = styled.select`
  ${tw`p-2 mx-1 border-none outline-none text-base`}
`;
