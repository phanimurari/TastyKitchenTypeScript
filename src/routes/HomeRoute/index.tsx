import { Component } from "react";
import Cookies from "js-cookie";
import Header from "../../common/components/Header";
import CarouselComponent from "../../components/Carousel";
import LoaderComponent from "../../common/components/Loader";
import PopularRestuarantHeader from "../../components/HomePageRestuarantHeader";
import RestuarntListComponent from "../../components/RestuarntListComponent";
import PaginationComponent from "../../components/Pagination";
import Footer from "../../common/components/Footer";

const getCarouselImageDataURl = "https://apis.ccbp.in/restaurants-list/offers";

const getPopularRestauartsApiURL = "https://apis.ccbp.in/restaurants-list";

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

interface HomeRouteSateTypes {
  carouselData: Array<carouselDataObjectType>;
  restuarantsData: Array<restaurantsType>;
  sortBy: string;
  apiStatusOfCarouselData: string;
  apiStatusOfRestuarant: string;
  totalNumberOfRestuarants: number | null;
  paginationPageCount: number;
  searchInput: string;
}

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const homeRouteTextStrings = {
  sortByHigh: "Highest",
  sortByLow: "Low",
  limit: 9,
  paginationPageCount: 1,
  totalRestuarants: 0,
};

class HomeRoute extends Component<HomeRouteSateTypes> {
  state = {
    carouselData: [],
    restuarantsData: [],
    sortBy: homeRouteTextStrings.sortByHigh,
    apiStatusOfCarouselData: apiStatusConstants.initial,
    apiStatusOfRestuarant: apiStatusConstants.initial,
    totalRestuarants: homeRouteTextStrings.totalRestuarants,
    paginationPageCount: homeRouteTextStrings.paginationPageCount,
    searchInput: "",
  };

  componentDidMount() {
    this.getCarouselData();
    this.getPopularRestaurants();
  }

  getCarouselData = async () => {
    this.setState({ apiStatusOfCarouselData: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(getCarouselImageDataURl, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const caseConvertedData = fetchedData.offers.map(
        (offer: carouselDataObjectType) => ({
          imageUrl: offer.image_url,
          id: offer.id,
        })
      );
      this.setState({
        carouselData: caseConvertedData,
        apiStatusOfCarouselData: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatusOfCarouselData: apiStatusConstants.failure,
      });
    }
  };

  getPopularRestaurants = async () => {
    this.setState({ apiStatusOfRestuarant: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const { paginationPageCount, sortBy } = this.state;

    const offset = (paginationPageCount - 1) * homeRouteTextStrings.limit;

    const apiUrl = `${getPopularRestauartsApiURL}?offset=${offset}&limit=${homeRouteTextStrings.limit}&sort_by_rating=${sortBy}`;

    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const caseConverted = fetchedData.restaurants.map(
        (restuarant: restaurantsType) => ({
          id: restuarant.id,
          name: restuarant.name,
          cuisine: restuarant.cuisine,
          imageUrl: restuarant.image_url,
          userRating: {
            totalReviews: restuarant.user_rating.total_reviews,
            rating: restuarant.user_rating.rating,
          },
        })
      );
      this.setState({
        restuarantsData: caseConverted,
        apiStatusOfRestuarant: apiStatusConstants.success,
        totalRestuarants: fetchedData.total,
      });
    } else {
      this.setState({
        apiStatusOfRestuarant: apiStatusConstants.failure,
      });
    }
  };

  onChangeSelect = (value: string) => {
    this.setState({ sortBy: value }, this.getPopularRestaurants);
  };

  onDecreasePage = () => {
    const { paginationPageCount } = this.state;

    if (paginationPageCount > 1) {
      this.setState(
        { paginationPageCount: paginationPageCount - 1 },
        this.getPopularRestaurants
      );
    }
  };

  onIncreasePage = () => {
    const { paginationPageCount, totalRestuarants } = this.state;
    if (paginationPageCount < totalRestuarants / homeRouteTextStrings.limit)
      this.setState(
        { paginationPageCount: paginationPageCount + 1 },
        this.getPopularRestaurants
      );
  };

  renderLoadingView = () => <LoaderComponent />;

  renderCarouselView = () => {
    const { carouselData } = this.state;
    return <CarouselComponent carouselData={carouselData} />;
  };

  renderListOfRestuarnts = () => {
    const { restuarantsData } = this.state;

    return <RestuarntListComponent restuarantsData={restuarantsData} />;
  };

  renderFailureView = () => <h1>Failure view</h1>;

  renderResutarantsHeader = () => (
    <PopularRestuarantHeader onChangeSelect={this.onChangeSelect} />
  );

  renderPagination = () => {
    const { paginationPageCount } = this.state;

    return (
      <PaginationComponent
        paginationPageCount={paginationPageCount}
        onDecreasePage={this.onDecreasePage}
        onIncreasePage={this.onIncreasePage}
      />
    );
  };

  renderHomePage = () => {
    const { apiStatusOfCarouselData } = this.state;

    switch (apiStatusOfCarouselData) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.success:
        return this.renderCarouselView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  renderResutarants = () => {
    const { apiStatusOfRestuarant } = this.state;

    switch (apiStatusOfRestuarant) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.success:
        return this.renderListOfRestuarnts();
      case apiStatusConstants.failure:
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
