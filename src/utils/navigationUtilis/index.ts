import { ADIM_HOME_PATH, USER_HOME_PATH } from "../../common/constants/routePathConstants"


export const goToUserDashBoard = (history: any) => {
    history.push(USER_HOME_PATH)
}

export const goToAdminDashBoard = (history: any) => {

    history.push(ADIM_HOME_PATH)
}