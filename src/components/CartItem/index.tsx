import { BiRupee } from "react-icons/bi";

import ButtonElement from "../../common/components/ButtonElement";
import {
  CartImage,
  CartItemContainer,
  CartItemImageContainer,
  CartItemName,
  ItemPrice,
  ItemPriceContainer,
  ItemQuantity,
  QuantityContainer,
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

interface cartItemProps {
  item: restuarantItemsDataTypes;
  onClickDecrementItemCount: (id: string) => void;
  onClickIncremenetItemCount: (id: string) => void;
}

const FoodItemStrings = {
  incrementButtonText: `+`,
  decrementButtonText: `-`,
  buttonType: `button`,
};

const CartItem = (props: cartItemProps) => {
  const { imageUrl, name, quantity, cost, id } = props.item;

  const { onClickDecrementItemCount, onClickIncremenetItemCount } = props;

  const onClickIncrement = () => {
    onClickIncremenetItemCount(id);
  };

  const onClickDecrement = () => {
    onClickDecrementItemCount(id);
  };

  return (
    <CartItemContainer>
      <CartItemImageContainer>
        <CartImage src={imageUrl} />
        <CartItemName>{name}</CartItemName>
      </CartItemImageContainer>
      <QuantityContainer>
        <ButtonElement
          buttonText={FoodItemStrings.decrementButtonText}
          buttonType={FoodItemStrings.buttonType}
          onClickButtonMethod={onClickDecrement}
        />
        <ItemQuantity>{quantity}</ItemQuantity>
        <ButtonElement
          buttonText={FoodItemStrings.incrementButtonText}
          buttonType={FoodItemStrings.buttonType}
          onClickButtonMethod={onClickIncrement}
        />
      </QuantityContainer>
      <ItemPriceContainer>
        <BiRupee />
        <ItemPrice>{quantity * cost}</ItemPrice>
      </ItemPriceContainer>
    </CartItemContainer>
  );
};

export default CartItem;
