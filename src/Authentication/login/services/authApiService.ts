
import { apiMethods } from '../../../common/constants/apiConstants'
import { networkCallWithApisauce } from '../../../utils/apiUtils'

const url = "https://apis.ccbp.in/login";

interface loginObjectType {
    username: string,
    password: string
}


class AuthAPIService {
    api: string
    constructor() {
        this.api = url
    }

    logIn(loginObject: loginObjectType) {
        return networkCallWithApisauce(
            this.api,
            loginObject,
            apiMethods.post
        )
    }
}

export default AuthAPIService
