import styled from "styled-components";

import tw from "twin.macro";


const colors = {
  headerActiveLinkColor: "#f7931e",
  headerUnActiveLinkColor: "#334155",
  headerBackgroundColor: "#f8fAfC",
  headerTitleTextColor: "#f7931e",
};


const styleUnits = {
  borderRadius: 15
}

export const LoginFormContainer = styled.div`
  ${tw`flex h-screen`}
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
    width: 100%;
  }
  @media screen and (min-width : 768px) {
    order: 1;
    width: 50%
  } 
`;

export const LoginImageContainer = styled.div`${tw`flex`}
@media screen and (max-width : 768px) {
    order : 1;
    height: 50%;
  }
  @media screen and (min-width : 768px) {
    order: 2;
    width: 50%
  } 
`;

export const LoginLandingImage = styled.img`${tw`w-full`}
object-fit: cover;
@media screen and (max-width : 768px) {
border-bottom-left-radius: ${styleUnits.borderRadius}px;
border-bottom-right-radius: ${styleUnits.borderRadius}px
}
`;

export const LoginFormElemenet = styled.form`${tw`flex flex-col items-center shadow-md p-6`}
@media screen and (max-width : 768px) {
    width : 100%
  }
`;

export const LogoContainer = styled.div`${tw`flex items-center justify-center`}`;

export const HeaderLogoImage = styled.img``;

export const HeaderLogoTitle = styled.h1` ${tw`mx-2 italic`}
color: ${colors.headerTitleTextColor} `;


export const ShowPasswordContainer = styled.div`${tw`flex items-center w-8/12`}`

export const InputLabelElement = styled.label`${tw``}
color: ${colors.headerUnActiveLinkColor}
`