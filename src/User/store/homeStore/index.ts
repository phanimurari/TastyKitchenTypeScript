import { action, observable } from "mobx"


const homeRouteTextStrings = {
    sortByHigh: "Highest",
    sortByLow: "Low",
    limit: 9,
    paginationPageCount: 1,
    totalRestuarants: 0,
};


class HomeStore {

    @observable sortBy: string
    @observable paginationPageCount: number
    totalRestuarants: number

    constructor() {
        this.sortBy = homeRouteTextStrings.sortByHigh
        this.paginationPageCount = homeRouteTextStrings.paginationPageCount
        this.totalRestuarants = 0;
    }

    @action.bound onChangeSortBy(value: string) {
        this.sortBy = value
    }


    @action.bound incrementPaginationCount(totalRestuarants: number) {
        const { paginationPageCount } = this

        if (paginationPageCount < totalRestuarants / homeRouteTextStrings.limit) {
            this.paginationPageCount += 1;
        }

        console.log(this.paginationPageCount)
    }

    @action.bound decrementPaginationCount() {
        const { paginationPageCount } = this
        if (paginationPageCount > homeRouteTextStrings.paginationPageCount) {
            this.paginationPageCount -= 1
        }
    }

}


export default HomeStore