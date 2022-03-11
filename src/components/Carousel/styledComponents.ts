import styled from "styled-components";
import tw from "twin.macro";

export const StyledCarouselContainer = styled.div`
  @media screen and (min-width: 768px) {
    ${tw`py-2`}
  }
`;

export const StyledListElement = styled.li`
  @media screen and (max-width: 768px) {
    ${tw`w-full h-1/2`}
  }

  @media screen and (min-width: 768px) {
    ${tw`w-11/12`}
  }
`;

export const StyledCarouselImage = styled.img`
  ${tw`w-full`}
`;
