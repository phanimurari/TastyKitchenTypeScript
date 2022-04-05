import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import LoaderComponent from "../../../common/components/Loader";
import RestuarantDetails from "../../components/RestuarantDetails";
import { inject, observer } from "mobx-react";
import RestaurantDetailsStore from "../../store/restaurantDetailsStore/restaurantDetailsStore";
import { API_FAILED, API_FETCHING, API_SUCCESS } from "@ib/api-constants";


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

interface InjectedProps extends RouteComponentProps {
  restaurantDetailsStore: RestaurantDetailsStore;
}


@inject("restaurantDetailsStore")
@observer
class RestuarantDetailsRoute extends Component<InjectedProps> {
  componentDidMount() {
    this.getRestuarantDetails();
  }

  getInjectedProps = (): InjectedProps => this.props as InjectedProps;


  getRestaurantDetailsStore = () => this.getInjectedProps().restaurantDetailsStore;


  getRestuarantDetails = async () => {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const resturantId = pathname.split("/")[3];
    await this.getRestaurantDetailsStore().getRestuarantDetails(resturantId)
  };

  onClickDecrementFoodItemQuantity = async (id: string) => {
    const { restaurantFoodItemsList } = this.getRestaurantDetailsStore()

    const decrementItemsDataQuantity = restaurantFoodItemsList.map((item) => {
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
    const { restaurantFoodItemsList } = this.getRestaurantDetailsStore()


    const incrementedItemsDataQuantity = restaurantFoodItemsList.map((item) => {
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
        const findSelectedItemInItemsDataFromState = restaurantFoodItemsList.find(
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
      const addedItem = restaurantFoodItemsList.find(
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
    const { restaurantDetails, restaurantFoodItemsList } = this.getRestaurantDetailsStore()
    return (
      <RestuarantDetails
        resturantData={restaurantDetails}
        itemsData={restaurantFoodItemsList}
        onClickIncrementFoodItemQuantity={this.onClickIncrementFoodItemQuantity}
        onClickDecrementFoodItemQuantity={this.onClickDecrementFoodItemQuantity}
      />
    );
  };

  renderBasedOnApiStatus = () => {

    const { restaurantDetailsApiStatus } = this.getRestaurantDetailsStore()

    switch (restaurantDetailsApiStatus) {
      case API_FETCHING:
        return this.renderLoadingView();
      case API_SUCCESS:
        return this.renderRestuarantDetails();
      case API_FAILED:
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
