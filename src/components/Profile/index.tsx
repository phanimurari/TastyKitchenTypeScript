import { FaRegUserCircle } from "react-icons/fa";
import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import {
  ProfileContainer,
  ProfileInsideContainer,
  ProfileName,
  ProfileWelcomeText,
} from "./styledComponents";

const profileStrings = {
  iconSize: 150,
  welcomeText: "Hello, ",
  profileName: "Rahul",
};

const Profile = () => {
  const myProfile = () => (
    <ProfileInsideContainer>
      <FaRegUserCircle size={profileStrings.iconSize} />
      <ProfileWelcomeText>
        {profileStrings.welcomeText}{" "}
        <ProfileName>{profileStrings.profileName}</ProfileName>
      </ProfileWelcomeText>
    </ProfileInsideContainer>
  );

  return (
    <ProfileContainer>
      <Header />
      {myProfile()}
      <Footer />
    </ProfileContainer>
  );
};

export default Profile;
