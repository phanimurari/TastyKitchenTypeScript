import { Component } from "react";
import Cookies from "js-cookie";
import { RouteComponentProps, withRouter } from "react-router-dom";
import LoaderComponent from "../../common/components/Loader";
import RestuarantDetails from "../../components/RestuarantDetails";

interface restuarantDataTypes {
  id: string;

  imageUrl: string;

  restuarantName: string;

  restuarantCusine: string;

  restuarantLocation: string;

  restuarantRating: number;

  noOfReviews: number;

  costForTwo: number;

  itemsCount: number;
}

interface restuarantItemsDataTypes {
  id: string;
  name: string;
  cost: number;
  food_type?: string;
  foodType?: string;
  image_url?: string;
  imageUrl?: string;
  rating: number;
  quantity: number;
}

interface itemsDataTypes {
  itemsData: Array<restuarantItemsDataTypes>;
}

interface restuarantDetailsStateTypes extends RouteComponentProps {
  resturantData: restuarantDataTypes;
  itemsData: itemsDataTypes;
  apiStatus: string;
  addToCart: boolean;
}

const dataFetchUrl = "https://apis.ccbp.in/restaurants-list/";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class RestuarantDetailsRoute extends Component<restuarantDetailsStateTypes> {
  state = {
    resturantData: {
      id: "",
      imageUrl: "",
      restuarantName: "",
      restuarantCusine: "",
      restuarantLocation: "",
      restuarantRating: 0,
      noOfReviews: 0,
      costForTwo: 0,
      itemsCount: 0,
    },
    itemsData: [
      {
        id: "",
        name: "",
        cost: 0,
        foodType: "",
        imageUrl: "",
        rating: 0,
        quantity: 0,
      },
    ],
    apiStatus: apiStatusConstants.initial,
    addToCart: true,
  };

  componentDidMount() {
    this.getRestuarantDetails();
  }

  getRestuarantDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;

    const resturantId = pathname.split("/")[2];

    const apiUrl = `${dataFetchUrl}${resturantId}`;

    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const fetchedData = await response.json();

      const caseConvertedResturantData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        restuarantName: fetchedData.name,
        restuarantCusine: fetchedData.cuisine,
        restuarantLocation: fetchedData.location,
        restuarantRating: fetchedData.rating,
        noOfReviews: fetchedData.reviews_count,
        costForTwo: fetchedData.cost_for_two,
        itemsCount: fetchedData.items_count,
      };

      const caseConvertedFoodItemsData = fetchedData.food_items.map(
        (item: restuarantItemsDataTypes) => ({
          cost: item.cost,
          foodType: item.food_type,
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
          rating: item.rating,
          quantity: 0,
        })
      );

      const dataFromLocalStorage = localStorage.getItem(
        "resturantSpecificData"
      );

      if (dataFromLocalStorage !== null) {
        const itemsDataFromLocalStorage = JSON.parse(dataFromLocalStorage)
          .itemsData;
        const updateFetchedDataQuantity = caseConvertedFoodItemsData.map(
          (fetchedItem: restuarantItemsDataTypes) => {
            itemsDataFromLocalStorage.find(
              (itemInLocalStorage: restuarantItemsDataTypes) => {
                if (itemInLocalStorage.id === fetchedItem.id) {
                  fetchedItem.quantity = itemInLocalStorage.quantity;
                }
              }
            );
            return fetchedItem;
          }
        );
        this.setState({
          resturantData: caseConvertedResturantData,
          itemsData: updateFetchedDataQuantity,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          resturantData: caseConvertedResturantData,
          itemsData: caseConvertedFoodItemsData,
          apiStatus: apiStatusConstants.success,
        });
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  onClickDecrementFoodItemQuantity = async (id: string) => {
    const { resturantData, itemsData } = this.state;
    const decrementItemsDataQuantity = itemsData.map((item) => {
      if (item.id === id && item.quantity > 0) {
        item.quantity -= 1;
      }
      return item;
    });

    const dataFromLocalStorage = localStorage.getItem("resturantSpecificData");

    if (dataFromLocalStorage !== null) {
      const itemsDataFromLocalStorage = JSON.parse(dataFromLocalStorage)
        .itemsData;
      const findSelectedItemInItemsDataFromLocalStorage = itemsDataFromLocalStorage.find(
        (item: restuarantItemsDataTypes) => item.id === id
      );

      if (
        findSelectedItemInItemsDataFromLocalStorage !== undefined &&
        findSelectedItemInItemsDataFromLocalStorage.quantity > 0
      ) {
        const decrementQuanityInItemsDataInLocalStorage = itemsDataFromLocalStorage.map(
          (item: restuarantItemsDataTypes) => {
            if (item.id === id && item.quantity > 0) {
              item.quantity -= 1;
            }
            return item;
          }
        );

        const filteringOutTheItemsWIthQuantityZero = decrementQuanityInItemsDataInLocalStorage.filter(
          (item: restuarantItemsDataTypes) => item.quantity > 0
        );

        const updatedLocalStorageObject = JSON.stringify({
          itemsData: filteringOutTheItemsWIthQuantityZero,
        });
        localStorage.setItem(
          "resturantSpecificData",
          updatedLocalStorageObject
        );
      }
    }

    this.setState({ itemsData: decrementItemsDataQuantity });
  };

  onClickIncrementFoodItemQuantity = (id: string) => {
    const { itemsData, resturantData } = this.state;
    const incrementedItemsDataQuantity = itemsData.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });

    const dataFromLocalStorage = localStorage.getItem("resturantSpecificData");

    if (dataFromLocalStorage !== null) {
      const itemsDataFromLocalStorage = JSON.parse(dataFromLocalStorage)
        .itemsData;
      const findSelectedItemInItemsDataFromLocalStorage = itemsDataFromLocalStorage.find(
        (item: restuarantItemsDataTypes) => item.id === id
      );

      if (findSelectedItemInItemsDataFromLocalStorage !== undefined) {
        const incrementQuanityInItemsDataInLocalStorage = itemsDataFromLocalStorage.map(
          (item: restuarantItemsDataTypes) => {
            if (item.id === id) {
              item.quantity += 1;
            }
            return item;
          }
        );
        const updatedLocalStorageObject = JSON.stringify({
          itemsData: incrementQuanityInItemsDataInLocalStorage,
        });
        localStorage.setItem(
          "resturantSpecificData",
          updatedLocalStorageObject
        );
      } else {
        const findSelectedItemInItemsDataFromState = itemsData.find(
          (item: restuarantItemsDataTypes) => item.id === id
        );
        const updatedItemsData = [
          ...itemsDataFromLocalStorage,
          findSelectedItemInItemsDataFromState,
        ];
        const updatedLocalStorageObject = JSON.stringify({
          itemsData: updatedItemsData,
        });
        localStorage.setItem(
          "resturantSpecificData",
          updatedLocalStorageObject
        );
      }
    } else {
      const addedItem = itemsData.find(
        (item: restuarantItemsDataTypes) => item.id === id
      );
      const updatedAddItemArray = [addedItem];
      const updatedLocalStorageObject = JSON.stringify({
        itemsData: updatedAddItemArray,
      });
      localStorage.setItem("resturantSpecificData", updatedLocalStorageObject);
    }

    this.setState({ itemsData: incrementedItemsDataQuantity });
  };

  renderLoadingView = () => <LoaderComponent />;

  renderFailureView = () => <h1>Failure view</h1>;

  renderRestuarantDetails = () => {
    const { resturantData, itemsData } = this.state;
    return (
      <RestuarantDetails
        resturantData={resturantData}
        itemsData={itemsData}
        onClickIncrementFoodItemQuantity={this.onClickIncrementFoodItemQuantity}
        onClickDecrementFoodItemQuantity={this.onClickDecrementFoodItemQuantity}
      />
    );
  };

  renderBasedOnApiStatus = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.success:
        return this.renderRestuarantDetails();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return this.renderBasedOnApiStatus();
  }
}

export default withRouter(RestuarantDetailsRoute);
