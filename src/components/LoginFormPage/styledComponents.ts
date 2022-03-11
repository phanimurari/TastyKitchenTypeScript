import styled from "styled-components";

import tw from "twin.macro";


const colors = {
  headerActiveLinkColor: "#f7931e",
  headerUnActiveLinkColor: "#334155",
  headerBackgroundColor: "#f8fAfC",
  headerTitleTextColor: "#f7931e",
};

export const LoginFormContainer = styled.div`
  ${tw`flex`}
  @media screen and (max-width : 768px) {
    flex-direction: column
  }
  @media screen and (min-width : 768px) {
    flex-direction: row
  } 
`;

export const FormContainer = styled.div`${tw`flex w-2/4 justify-center items-center drop-shadow`}
@media screen and (max-width : 768px) {
    order : 2;
  }
  @media screen and (min-width : 768px) {
    order: 1;
  } 
`;

export const LoginImageContainer = styled.div`${tw`flex w-2/4`}
@media screen and (max-width : 768px) {
    order : 1
  }
  @media screen and (min-width : 768px) {
    order: 2;
  } 
`;

export const LoginLandingImage = styled.img`${tw`w-full`}`;

export const LoginFormElemenet = styled.form`${tw`flex flex-col items-center`}`;


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