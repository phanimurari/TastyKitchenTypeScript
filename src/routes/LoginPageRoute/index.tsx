import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoginFormPage from "../../components/LoginFormPage";

const url = "https://apis.ccbp.in/login";

const LANGING_IMAGE_URL =
  "https://res.cloudinary.com/imphanimurari/image/upload/v1637501465/Mini%20Projects/Tasty%20Kitchen/Rectangle_1456_fb4iv7.png";

interface LoginFormStateTypes {
  username: string;
  password: string;
  showSubmitError: boolean;
  errorMsg: string;
}

const loginPage = {
  userNamePlaceHolder: "Enter Username",
  passwordPlaceHolder: "Enter Password",
  inputTypeText: "text",
  inputTypePassword: "password",
  buttonType: "submit",
  buttonText: "Login",
};

class LoginFormRoute extends Component<
  RouteComponentProps,
  LoginFormStateTypes
> {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken: string) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg: string) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderErrorMessage = () => {
    const { showSubmitError, errorMsg } = this.state;

    return showSubmitError ? errorMsg : "";
  };

  renderLoginFormContainer = () => {
    const { username, password, showSubmitError, errorMsg } = this.state;

    return (
      <LoginFormPage
        username={username}
        password={password}
        submitForm={this.submitForm}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        showSubmitError={showSubmitError}
        errorMsg={errorMsg}
      />
    );
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      <Redirect to="/" />;
    }
    return this.renderLoginFormContainer();
  }
}

export default LoginFormRoute;
