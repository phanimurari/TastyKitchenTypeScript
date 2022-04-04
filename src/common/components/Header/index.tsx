import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import ButtonElement from "../ButtonElement";
import {
  DesktopHeader,
  HeaderButtonsContainer,
  HeaderListElement,
  HeaderLogoImage,
  HeaderLogoTitle,
  LogoAndHambegerIconContainer,
  LogoContainer,
  LogoLink,
  MobileHeader,
  ShowOptionsButton,
  StyledLink,
} from "./styledComponents";
import {
  CART_PATH,
  PROFILE_PATH,
  LOGIN_PATH,
  USER_HOME_PATH,
} from "../../constants/routePathConstants";
import { clearUserSession, getAccessToken } from "../../../utils/StorageUtilis";

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
    const token = getAccessToken();

    if (token !== undefined) {
      clearUserSession();
    }

    history.replace(LOGIN_PATH);
  };

  renderLogoContainer = () => (
    <LogoLink to={LOGIN_PATH}>
      <LogoContainer>
        <HeaderLogoImage src={headerLogoImageSrc} />
        <HeaderLogoTitle>{HeaderPageStrings.headerLogoText}</HeaderLogoTitle>
      </LogoContainer>
    </LogoLink>
  );

  renderMenuOptions = () => {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const isHomePathActive: boolean = pathname === USER_HOME_PATH;
    const isCartPathActive: boolean = pathname === CART_PATH;
    const isProfileCartPathActive: boolean = pathname === PROFILE_PATH;

    return (
      <HeaderButtonsContainer>
        <HeaderListElement>
          <StyledLink to={USER_HOME_PATH} isLinkActive={isHomePathActive}>
            {HeaderPageStrings.homeText}
          </StyledLink>
        </HeaderListElement>
        <HeaderListElement>
          <StyledLink to={CART_PATH} isLinkActive={isCartPathActive}>
            {HeaderPageStrings.cartText}
          </StyledLink>
        </HeaderListElement>
        <HeaderListElement>
          <StyledLink to={PROFILE_PATH} isLinkActive={isProfileCartPathActive}>
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
