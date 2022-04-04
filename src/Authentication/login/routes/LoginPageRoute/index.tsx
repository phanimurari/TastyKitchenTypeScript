import { Component } from "react";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoginFormPage from "../../components/LoginFormPage";
import { getAccessToken, setCookie } from "../../../../utils/StorageUtilis";
import { USER_HOME_PATH } from "../../../../common/constants/routePathConstants";

import AuthStore from "../../store/authStore";
import { isLoggedIn } from "../../../../utils/authUtilis";
import {
  goToAdminDashBoard,
  goToUserDashBoard,
} from "../../../../utils/navigationUtilis";

const errorMessage = "Incorrect username or password";

interface InjectedProps extends RouteComponentProps {
  authStore: AuthStore;
  onChangeEventType: React.ChangeEvent<HTMLInputElement>;
}

@inject("authStore")
@observer
class LoginFormRoute extends Component<RouteComponentProps> {
  @observable username: string;
  @observable password: string;
  @observable showSubmitError: boolean;
  @observable errorMsg: string | Error;
  @observable showPassword: boolean;
  @observable isLoading: boolean;

  constructor(props: any) {
    super(props);
    this.username = "";
    this.password = "";
    this.showSubmitError = false;
    this.errorMsg = "";
    this.showPassword = false;
    this.isLoading = false;
  }

  getInjectedProps = (): InjectedProps => this.props as InjectedProps;

  getAuthStore = () => {
    return this.getInjectedProps().authStore;
  };

  @action.bound onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    this.username = event.target.value;
  }

  @action.bound onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    this.password = event.target.value;
  }

  @action.bound onShowPassword = () => {
    const { showPassword } = this;
    this.showPassword = !showPassword;
  };

  @action.bound onSubmitSuccess = (jwtToken: string) => {
    const { history } = this.props;

    setCookie("jwt_token", jwtToken);

    history.replace(USER_HOME_PATH);
  };

  submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this;
    if (username !== "" && password !== "") {
      this.isLoading = true;
      const userDetails = { username, password };
      await this.getAuthStore().userLogin(userDetails);
      if (getAccessToken() !== undefined) {
        this.redirectPage()
      }
      else if (this.getAuthStore().userLoginApiError !== '') {
        this.errorMsg = this.getAuthStore().userLoginApiError
      }
    } else {
      this.errorMsg = errorMessage;
    }
  };

  @action.bound redirectPage() {
    const { isAdmin } = this.getAuthStore();
    if (isAdmin && isLoggedIn()) {
      goToAdminDashBoard(this.getInjectedProps().history);
    } else if (!isAdmin && isLoggedIn()) {
      goToUserDashBoard(this.getInjectedProps().history);
    }
  }

  renderLoginFormContainer = () => {
    const { username, password, errorMsg, showPassword, isLoading } = this;

    return (
      <LoginFormPage
        username={username}
        password={password}
        submitForm={this.submitForm}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onShowPassword={this.onShowPassword}
        errorMsg={errorMsg}
        showPassword={showPassword}
        isLoading={isLoading}
      />
    );
  };

  render() {
    return isLoggedIn() ? (
      <Redirect to={USER_HOME_PATH} />
    ) : (
      this.renderLoginFormContainer()
    );
  }
}

export default LoginFormRoute;
