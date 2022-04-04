import { Link } from "react-router-dom";

import { FaRupeeSign } from "react-icons/fa";

import ButtonElement from "../../../common/components/ButtonElement";

import CartItem from "../CartItem";

import {
  CartItemFooterText,
  CartItemsFooterContainer,
  CartItemsListContainer,
  CartItemsTableHeader,
  CartItemTableText,
  PriceAndIconContainer,
  TotalCartPriceContainer,
  TotalPriceText,
} from "./styledComponents";

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
  cartItemsData: Array<restuarantItemsDataTypes>;
  onClickDecrementItemCount: (id: string) => void;
  onClickIncremenetItemCount: (id: string) => void;
}

const cartListStrings = {
  item: "Item",
  quantity: "Quantity",
  price: "Price",
  footerText: "Order Total:",
  placeOrderButtonText: "Place Order",
  buttonType: "button",
};

const routePaths = {
  placeOrderRoutePath: "/order-placed",
};

const CartList = (props: cartItemsDataTypes) => {
  const {
    cartItemsData,
    onClickDecrementItemCount,
    onClickIncremenetItemCount,
  } = props;
  const filterCartItems = () =>
    cartItemsData.filter((item) => item.quantity > 0);

  const rendCartItemsHeader = () => (
    <CartItemsTableHeader>
      <CartItemTableText>{cartListStrings.item}</CartItemTableText>
      <CartItemTableText>{cartListStrings.quantity}</CartItemTableText>
      <CartItemTableText>{cartListStrings.quantity}</CartItemTableText>
    </CartItemsTableHeader>
  );

  const renderCartListFooter = (
    addedCartItems: Array<restuarantItemsDataTypes>
  ) => {
    const totalCost = addedCartItems
      .map((item) => item.cost * item.quantity)
      .reduce((totalPrice, price) => totalPrice + price, 0);

    return (
      <CartItemsFooterContainer>
        <CartItemFooterText>{cartListStrings.footerText}</CartItemFooterText>
        <TotalCartPriceContainer>
          <PriceAndIconContainer>
            <FaRupeeSign />
            <TotalPriceText>{totalCost}</TotalPriceText>
          </PriceAndIconContainer>
          <Link to={routePaths.placeOrderRoutePath}>
            <ButtonElement
              buttonText={cartListStrings.placeOrderButtonText}
              buttonType={cartListStrings.buttonType}
            ></ButtonElement>
          </Link>
        </TotalCartPriceContainer>
      </CartItemsFooterContainer>
    );
  };

  const renderCartList = () => {
    const addedCartItems = filterCartItems();

    if (addedCartItems.length > 0) {
      return (
        <CartItemsListContainer>
          {rendCartItemsHeader()}
          {addedCartItems.map((item: restuarantItemsDataTypes) => (
            <CartItem
              item={item}
              key={item.id}
              onClickIncremenetItemCount={onClickIncremenetItemCount}
              onClickDecrementItemCount={onClickDecrementItemCount}
            />
          ))}
          {renderCartListFooter(addedCartItems)}
        </CartItemsListContainer>
      );
    } else {
      return <h1>Empty Cart List</h1>;
    }
  };

  return renderCartList();
};

export default CartList;
