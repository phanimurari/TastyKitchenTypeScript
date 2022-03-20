import styled from "styled-components";
import tw from "twin.macro";

import { Link } from "react-router-dom";

const colors = {
  headerActiveLinkColor: "#f7931e",
  headerUnActiveLinkColor: "#334155",
  headerBackgroundColor: "#f8fAfC",
  headerTitleTextColor: "#f7931e",
};

export const MobileHeader = styled.div`
  display: none;
  ${tw`p-2`};
  background-color: ${colors.headerBackgroundColor};
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LogoAndHambegerIconContainer = styled.div`
  ${tw`flex items-center justify-between w-full pl-2 pr-2`}
`;

export const ShowOptionsButton = styled.button`
  ${tw``};
  border: none;
`;

export const DesktopHeader = styled.div`
  display: none;
  ${tw`pl-6`};
  ${tw`pr-6`};
  background-color: ${colors.headerBackgroundColor};
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const LogoLink = styled(Link)`text-decoration: none`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderLogoImage = styled.img``;

export const HeaderLogoTitle = styled.h1`
  font-family: DM Sans;
  font-style: italic;
  font-weight: bold;
  font-size: 24px;
  color: ${colors.headerTitleTextColor};
  margin-left: 10px;
`;

export const HeaderButtonsContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderListElement = styled.li`
  list-style-type: none;
  ${tw`mr-3 ml-3`};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props: { isLinkActive: boolean }) =>
    props.isLinkActive
      ? colors.headerActiveLinkColor
      : colors.headerUnActiveLinkColor};
  font-family: DM Sans;
  font-weight: bold;
  margin-right: 15px;
`;
