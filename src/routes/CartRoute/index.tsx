import { Component } from "react";
import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import Cart from "../../components/Cart";
import CartList from "../../components/CartList";

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

interface cartItemsDataTypes {
  itemsData: Array<restuarantItemsDataTypes>;
}

class CartRoute extends Component<cartItemsDataTypes> {
  state = {
    cartItemsData: [
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
  };

  componentDidMount() {
    this.getCartItemsDataFromLocalStorage();
  }

  getCartItemsDataFromLocalStorage = () => {
    const resturantSpecificData = localStorage.getItem("resturantSpecificData");
    if (resturantSpecificData) {
      const parsedResturantData = JSON.parse(resturantSpecificData);
      const { itemsData } = parsedResturantData;
      this.setState({ cartItemsData: itemsData });
    }
  };

  onClickDecrementFoodItemQuantity = async (id: string) => {
    const { cartItemsData } = this.state;
    const decrementItemsDataQuantity = cartItemsData.map((item) => {
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
    const { cartItemsData } = this.state;
    const incrementedItemsDataQuantity = cartItemsData.map((item) => {
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
        const findSelectedItemInItemsDataFromState = cartItemsData.find(
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
      const addedItem = cartItemsData.find(
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

  render() {
    const { cartItemsData } = this.state;

    return (
      <Cart
        cartItemsData={cartItemsData}
        onClickDecrementItemCount={this.onClickDecrementFoodItemQuantity}
        onClickIncremenetItemCount={this.onClickIncrementFoodItemQuantity}
      />
    );
  }
}

export default CartRoute;
