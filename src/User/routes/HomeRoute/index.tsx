import { Component } from "react";
import Header from "../../../common/components/Header";
import CarouselComponent from "../../components/Carousel";
import LoaderComponent from "../../../common/components/Loader";
import PopularRestuarantHeader from "../../components/HomePageRestuarantHeader";
import RestuarntListComponent from "../../components/RestuarntListComponent";
import PaginationComponent from "../../components/Pagination";
import Footer from "../../../common/components/Footer";
import { inject, observer } from "mobx-react";
import { CarouselStore } from "../../store/carouselStore/carouselStore";
import HomeStore from "../../store/homeStore";
import { action } from "mobx";
import { API_FAILED, API_FETCHING, API_SUCCESS } from "@ib/api-constants";
import RestaurantsStore from "../../store/restaurantsStore/restaurantsStore";

interface carouselDataObjectType {
  imageUrl?: string;
  id: number;
  image_url?: string;
}

interface userRatingTypes {
  rating_text: string;
  rating_color: string;
  total_reviews: number;
  rating: number;
}

interface restaurantsType {
  id: number;
  name: string;
  user_rating: userRatingTypes;
  cuisine: string;
  image_url: string;
}

interface InjectedProps {
  carouselStore: CarouselStore;
  homeStore: HomeStore;
  restaurantsStore: RestaurantsStore;
}

interface HomeRouteSateTypes extends InjectedProps {
  carouselData: Array<carouselDataObjectType>;
  restuarantsData: Array<restaurantsType>;
  sortBy: string;
  apiStatusOfCarouselData: string;
  apiStatusOfRestuarant: string;
  totalNumberOfRestuarants: number | null;
  paginationPageCount: number;
  searchInput: string;
}

const homeRouteTextStrings = {
  sortByHigh: "Highest",
  sortByLow: "Low",
  limit: 9,
  paginationPageCount: 1,
  totalRestuarants: 0,
};

@inject("carouselStore", "homeStore", "restaurantsStore")
@observer
class HomeRoute extends Component<HomeRouteSateTypes> {
  componentDidMount() {
    this.getCarouselData();
    this.getPopularRestaurants();
  }

  getInjectedProps = (): InjectedProps => this.props as InjectedProps;

  getCarouselStore = () => {
    return this.getInjectedProps().carouselStore;
  };

  getHomeStore = () => {
    return this.getInjectedProps().homeStore;
  };

  getRestuarantStore = () => {
    return this.getInjectedProps().restaurantsStore;
  };

  getCarouselData = async () => {
    const carouselStore = this.getCarouselStore();
    await carouselStore.getCarouselData();
  };

  getPopularRestaurants = async () => {
    const { sortBy, paginationPageCount } = this.getHomeStore();
    const offset = (paginationPageCount - 1) * homeRouteTextStrings.limit;
    await this.getRestuarantStore().getRestuarants(
      offset,
      homeRouteTextStrings.limit,
      sortBy
    );
  };

  @action.bound
  onChangeSelect = async (value: string) => {
    const { onChangeSortBy } = this.getHomeStore();
    await onChangeSortBy(value);
    this.getPopularRestaurants();
  };

  @action.bound
  onDecreasePage = async () => {
    const { decrementPaginationCount } = this.getHomeStore();
    await decrementPaginationCount();
    this.getPopularRestaurants();
  };

  @action.bound
  onIncreasePage = async () => {
    const { incrementPaginationCount } = this.getHomeStore();
    const totalRestuarants = this.getRestuarantStore().numberOfRestaurants;
    await incrementPaginationCount(totalRestuarants);
    this.getPopularRestaurants();
  };

  renderLoadingView = () => <LoaderComponent />;

  renderCarouselView = () => {
    const { carouselData } = this.getCarouselStore();
    return <CarouselComponent carouselData={carouselData} />;
  };

  renderListOfRestuarnts = () => {
    const { restuarantsData } = this.getRestuarantStore();
    return <RestuarntListComponent restuarantsData={restuarantsData} />;
  };

  renderFailureView = () => <h1>Failure view</h1>;

  renderResutarantsHeader = () => (
    <PopularRestuarantHeader onChangeSelect={this.onChangeSelect} />
  );

  renderPagination = () => {
    const { paginationPageCount } = this.getHomeStore();

    return (
      <PaginationComponent
        paginationPageCount={paginationPageCount}
        onDecreasePage={this.onDecreasePage}
        onIncreasePage={this.onIncreasePage}
      />
    );
  };

  renderHomePage = () => {
    const { carouselApiStatus } = this.getCarouselStore();

    switch (carouselApiStatus) {
      case API_FETCHING:
        return this.renderLoadingView();
      case API_SUCCESS:
        return this.renderCarouselView();
      case API_FAILED:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  renderResutarants = () => {
    const { restaurantsApiStatus } = this.getRestuarantStore();

    switch (restaurantsApiStatus) {
      case API_FETCHING:
        return this.renderLoadingView();
      case API_SUCCESS:
        return this.renderListOfRestuarnts();
      case API_FAILED:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        {this.renderHomePage()}
        {this.renderResutarantsHeader()}
        {this.renderResutarants()}
        {this.renderPagination()}
        <Footer />
      </>
    );
  }
}

export default HomeRoute;
