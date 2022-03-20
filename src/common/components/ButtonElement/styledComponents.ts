import styled from "styled-components";
import tw from "twin.macro";

const colors = {
  loginColor: "#f7931e",
  logoutColor: "#f7931e",
  buttonTextColor: "#ffffff",
};

export const StyledButtonElement = styled.button`${tw`cursor-pointer`}align-item: 
width: 100px;
background-color: ${colors.loginColor};
border: none;
${tw`p-2`};
${tw`rounded-md`};
color: ${colors.buttonTextColor};
min-width:30px
`;
