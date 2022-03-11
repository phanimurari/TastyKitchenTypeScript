import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

import ButtonElement from "../ButtonElement";
import {
  DesktopHeader,
  HeaderButtonsContainer,
  HeaderListElement,
  HeaderLogoImage,
  HeaderLogoTitle,
  LogoAndHambegerIconContainer,
  LogoContainer,
  MobileHeader,
  ShowOptionsButton,
  StyledLink,
} from "./styledComponents";

const headerLogoImageSrc =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1637500886/Mini%20Projects/Tasty%20Kitchen/Vector_1_kjlhlr.png";

const HeaderPageStrings = {
  headerLogoText: "Tasty Kitchen",
  homeText: "Home",
  cartText: "Cart",
  logoutButtonText: "Logout",
  typeOfButton: "button",
  profileText: "Profile",
};

const routePaths = {
  loginPagePath: "/login",
  homePagePath: "/",
  cartPagePath: "/cart",
  profilePagePath: "/my-profile",
};

interface HeaderStateTypes {
  isHamberburgerIconClicked: boolean;
  activePage: string;
}

class Header extends Component<RouteComponentProps, HeaderStateTypes> {
  state = {
    isHamberburgerIconClicked: false,
    activePage: HeaderPageStrings.homeText,
  };

  onToggleOptions = () => {
    const { isHamberburgerIconClicked } = this.state;
    this.setState({ isHamberburgerIconClicked: !isHamberburgerIconClicked });
  };

  onLogOut = () => {
    const { history } = this.props;
    const token = Cookies.get("jwt_token");

    if (token !== undefined) {
      Cookies.remove(token);
    }

    history.replace(routePaths.loginPagePath);
  };

  renderLogoContainer = () => (
    <LogoContainer>
      <HeaderLogoImage src={headerLogoImageSrc} />
      <HeaderLogoTitle>{HeaderPageStrings.headerLogoText}</HeaderLogoTitle>
    </LogoContainer>
  );

  renderMenuOptions = () => {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const isHomePathActive: boolean = pathname === routePaths.homePagePath;
    const isCartPathActive: boolean = pathname === routePaths.cartPagePath;
    const isProfileCartPathActive: boolean =
      pathname === routePaths.profilePagePath;

    return (
      <HeaderButtonsContainer>
        <HeaderListElement>
          <StyledLink
            to={routePaths.homePagePath}
            isLinkActive={isHomePathActive}
          >
            {HeaderPageStrings.homeText}
          </StyledLink>
        </HeaderListElement>
        <HeaderListElement>
          <StyledLink
            to={routePaths.cartPagePath}
            isLinkActive={isCartPathActive}
          >
            {HeaderPageStrings.cartText}
          </StyledLink>
        </HeaderListElement>
        <HeaderListElement>
          <StyledLink
            to={routePaths.profilePagePath}
            isLinkActive={isProfileCartPathActive}
          >
            {HeaderPageStrings.profileText}
          </StyledLink>
        </HeaderListElement>
        <HeaderListElement>
          <ButtonElement
            onClickButtonMethod={this.onLogOut}
            buttonText={HeaderPageStrings.logoutButtonText}
            buttonType={HeaderPageStrings.typeOfButton}
          />
        </HeaderListElement>
      </HeaderButtonsContainer>
    );
  };

  renderMobileHeader = () => {
    const { isHamberburgerIconClicked } = this.state;
    return (
      <MobileHeader>
        <LogoAndHambegerIconContainer>
          {this.renderLogoContainer()}
          <ShowOptionsButton onClick={this.onToggleOptions}>
            {isHamberburgerIconClicked ? (
              <IoMdClose fontSize={25} />
            ) : (
              <GiHamburgerMenu fontSize={25} />
            )}
          </ShowOptionsButton>
        </LogoAndHambegerIconContainer>
        {isHamberburgerIconClicked ? this.renderMenuOptions() : null}
      </MobileHeader>
    );
  };

  renderDesktopHeader = () => (
    <DesktopHeader>
      {this.renderLogoContainer()}
      {this.renderMenuOptions()}
    </DesktopHeader>
  );

  renderHeader = () => (
    <>
      {this.renderMobileHeader()}
      {this.renderDesktopHeader()}
    </>
  );

  render() {
    return this.renderHeader();
  }
}

export default withRouter(Header);
