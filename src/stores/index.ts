import AuthAPIService from "../Authentication/login/services/authApiService"
import AuthStore from "../Authentication/login/store/authStore"


const authService = new AuthAPIService()

const authStore = new AuthStore(authService)

export default {
    authStore
}