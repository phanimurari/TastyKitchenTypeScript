import { observer } from "mobx-react";

import InputElement from "../../../../common/components/InputElement";
import {
  LoginFormContainer,
  FormContainer,
  LoginImageContainer,
  LoginFormElemenet,
  LoginLandingImage,
  LogoContainer,
  HeaderLogoImage,
  HeaderLogoTitle,
  ShowPasswordContainer,
  InputLabelElement,
} from "./styledComponents";

import ButtonElement from "../../../../common/components/ButtonElement";

const headerLogoImageSrc =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1637500886/Mini%20Projects/Tasty%20Kitchen/Vector_1_kjlhlr.png";

const LOGO_IMG_SRC_URL =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1637500886/Mini%20Projects/Tasty%20Kitchen/Vector_1_kjlhlr.png";

const url = "https://apis.ccbp.in/login";

const LANGING_IMAGE_URL =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1637501465/Mini%20Projects/Tasty%20Kitchen/Rectangle_1456_fb4iv7.png";

const loginPage = {
  userNamePlaceHolder: "Enter Username",
  passwordPlaceHolder: "Enter Password",
  inputTypeText: "text",
  inputTypePassword: "password",
  buttonType: "submit",
  buttonText: "Login",
  logoText: "Tasty Kitchen",
  showPasswordInputType: "checkbox",
  inputLableText: "Show Password",
  showPasswordInputTypeId: "showPassword",
};

interface loginFormPropsTypes {
  username: string;
  password: string;
  submitForm: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowPassword: () => void;
  showPassword: boolean;
  errorMsg: Error | string;
  isLoading: boolean;
}

const LoginFormPage = (props: loginFormPropsTypes) => {
  const {
    username,
    password,
    submitForm,
    onChangeUsername,
    onChangePassword,
    errorMsg,
    onShowPassword,
    showPassword,
    isLoading,
  } = props;

  const renderErrorMessage = () => errorMsg;

  return (
    <LoginFormContainer>
      <FormContainer>
        <LoginFormElemenet onSubmit={submitForm}>
          <LogoContainer>
            <HeaderLogoImage src={headerLogoImageSrc} />
            <HeaderLogoTitle>{loginPage.logoText}</HeaderLogoTitle>
          </LogoContainer>
          <InputElement
            inputValue={username}
            onChangeMethod={onChangeUsername}
            placeHolderText={loginPage.userNamePlaceHolder}
            typeOfInput={loginPage.inputTypeText}
          />

          <InputElement
            inputValue={password}
            onChangeMethod={onChangePassword}
            placeHolderText={loginPage.passwordPlaceHolder}
            typeOfInput={
              showPassword
                ? loginPage.inputTypeText
                : loginPage.inputTypePassword
            }
          />
          <ShowPasswordContainer>
            <InputElement
              onChangeMethod={onShowPassword}
              typeOfInput={loginPage.showPasswordInputType}
              id={loginPage.showPasswordInputTypeId}
            />
            <InputLabelElement htmlFor={loginPage.showPasswordInputTypeId}>
              {loginPage.inputLableText}
            </InputLabelElement>
          </ShowPasswordContainer>
          <ButtonElement
            buttonText={loginPage.buttonText}
            buttonType={loginPage.buttonType}
          />
          {renderErrorMessage()}
        </LoginFormElemenet>
      </FormContainer>
      <LoginImageContainer>
        <LoginLandingImage src={LANGING_IMAGE_URL} />
      </LoginImageContainer>
    </LoginFormContainer>
  );
};

export default LoginFormPage;
