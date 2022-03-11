import styled from "styled-components";

import tw from "twin.macro";

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
