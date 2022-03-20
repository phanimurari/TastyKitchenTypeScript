import { action, observable } from "mobx"
import AuthAPIService from "../services/authApiService"
import { apiStatusConstants, statusCodes } from '../../../common/constants/apiConstants'
import { setAccessToken } from "../../../utils/StorageUtilis"

class AuthStore {

    @observable userLoginApiStatus: string
    @observable userLoginApiError: Error | string
    @observable isAdmin: boolean
    authService: AuthAPIService

    constructor(authService: any) {
        this.authService = authService
        this.userLoginApiStatus = ''
        this.userLoginApiError = ''
        this.isAdmin = false
        this.init()
    }

    @action.bound init() {
        this.userLoginApiStatus = apiStatusConstants.initial
    }

    @action.bound userLogin = async (loginObject: { username: string, password: string }) => {
        const userLoginPromise = this.authService.logIn(loginObject)

        const fetchResponse = await userLoginPromise.then((response) => {
            return response.json()
        })

        if (fetchResponse.status_code === statusCodes.badRequestErrorCode) {
            this.setUserLoginApiError(fetchResponse.error_msg)
        }
        else {
            this.setUserLoginApiResponse(fetchResponse)
        }

    }

    @action.bound setUserLoginApiResponse(data: { jwt_token: string }) {
        this.userLoginApiError = ''
        setAccessToken(data.jwt_token)
    }


    @action.bound setUserLoginApiError(error: string) {
        this.userLoginApiStatus = apiStatusConstants.failure
        this.userLoginApiError = error
    }
}

export default AuthStore