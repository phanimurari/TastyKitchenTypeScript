import { action, observable } from "mobx";
import { bindPromiseWithOnSuccess } from "@ib/mobx-promise";
import { API_FAILED, API_INITIAL } from "@ib/api-constants";
import AuthAPIService from "../services/authApiService";
import { getUserDisplayableErrorMessage } from "../../../utils/apiUtils";
import { ACCESS_TOKEN, setAccessToken } from "../../../utils/StorageUtilis";
import { response } from "msw";
import { statusCodes } from "../../../common/constants/ApiConstants";

class AuthStore {
  @observable userLoginApiStatus: number;
  @observable userLoginApiError: Error | string;
  @observable isAdmin: boolean;
  authService: AuthAPIService;

  constructor(authService: any) {
    this.authService = authService;
    this.userLoginApiError = "";
    this.userLoginApiStatus = API_INITIAL;
    this.isAdmin = false;
    this.init();
  }

  @action.bound init() {
    this.userLoginApiStatus = API_INITIAL;
  }

  @action.bound userLogin = async (loginObject: {
    username: string;
    password: string;
  }) => {
    const stringifiedLoginObject = JSON.stringify(loginObject);

    const userLoginPromise = await this.authService.logIn(
      stringifiedLoginObject
    );

    try {
      const statusCode = userLoginPromise.status_code;
      if (statusCode === statusCodes.badRequestErrorCode) {
        this.setUserLoginApiError(userLoginPromise);
      } else {
        this.setUserLoginApiResponse(userLoginPromise);
      }
    } catch {
      console.log("error");
    }
  };

  @action.bound setUserLoginApiStatus(status: number) {
    this.userLoginApiStatus = status;
    console.log(this.userLoginApiStatus, "status");
  }

  @action.bound setUserLoginApiResponse = async (response: any) => {
    if (response[ACCESS_TOKEN] !== undefined) {
      this.userLoginApiError = "";
      setAccessToken(response[ACCESS_TOKEN]);
      this.isAdmin = response.is_user;
    }
  };

  @action.bound setUserLoginApiError(error: any) {
    this.userLoginApiStatus = statusCodes.badRequestErrorCode;
    this.userLoginApiError = error.error_msg;
  }

  @action.bound clearStore() {
    this.init();
  }
}

export default AuthStore;
