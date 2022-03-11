import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import {
  FooterContainer,
  FooterDescription,
  FooterIconItem,
  FooterLogoContainer,
  FooterLogosIconsContainer,
  LogoImage,
  LogoText,
} from "./styledComponents";

const footerStrings = {
  iconSize: 40,
  logoText: "Tasty Kitchen",
  footerDescription: "The only thing we are serious about is food",
};

const colors = {
  white: "#ffffff",
};

const LogoURL =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1646500554/Mini%20Projects/Tasty%20Kitchen/Vector_1_b2f8kt.png";

const Footer = () => (
  <FooterContainer>
    <FooterLogoContainer>
      <LogoImage src={LogoURL} />
      <LogoText>{footerStrings.logoText}</LogoText>
    </FooterLogoContainer>
    <FooterDescription>{footerStrings.footerDescription}</FooterDescription>
    <FooterLogosIconsContainer>
      <FooterIconItem>
        <FaPinterestSquare size={footerStrings.iconSize} />
      </FooterIconItem>
      <FooterIconItem>
        <FaFacebookSquare size={footerStrings.iconSize} />
      </FooterIconItem>
      <FooterIconItem>
        <FaInstagramSquare size={footerStrings.iconSize} />
      </FooterIconItem>
      <FooterIconItem>
        <FaTwitterSquare size={footerStrings.iconSize} />
      </FooterIconItem>
    </FooterLogosIconsContainer>
  </FooterContainer>
);

export default Footer;
