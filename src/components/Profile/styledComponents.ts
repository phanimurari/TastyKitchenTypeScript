import styled from "styled-components";

import tw from "twin.macro";

const colors = {
  profileNameColor: "#f7931e",
};

export const ProfileContainer = styled.div`
  ${tw`flex flex-col h-screen `}
`;

export const ProfileInsideContainer = styled.div`
  ${tw`flex flex-col h-5/6 items-center justify-center`}
`;

export const ProfileWelcomeText = styled.h1`
  ${tw`italic`}
`;

export const ProfileName = styled.span`
  ${tw``}
  color: ${colors.profileNameColor}
`;
