import styled from "styled-components";
import tw from "twin.macro";

const colors = {
  footerBackgroundColor: "#0f172a",
  textColor: "#ffffff",
};

export const FooterContainer = styled.div`
  ${tw`h-64 flex flex-col justify-center items-center`}
  color: ${colors.textColor};
  background-color: ${colors.footerBackgroundColor};
`;

export const FooterLogoContainer = styled.div`
  ${tw`flex items-center`}
`;

export const LogoImage = styled.img``;

export const LogoText = styled.h1`
  ${tw`mx-2`}
`;

export const FooterDescription = styled.p``;

export const FooterLogosIconsContainer = styled.ul`
  ${tw`flex list-none`}
`;

export const FooterIconItem = styled.li`
  ${tw`mx-2`}
`;
