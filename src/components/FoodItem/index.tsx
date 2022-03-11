import { BiRupee } from "react-icons/bi";

import { AiFillStar } from "react-icons/ai";
import {
  FoodItemContainer,
  FoodItemHeading,
  FoodItemIconContainer,
  FoodItemImage,
  FoodItemImageContainer,
  FoodItemPara,
  FoodItemsButtonsContainer,
  FoodItemTextContainer,
  ItemsQuantityText,
} from "./styledComponents";
import ButtonElement from "../../common/components/ButtonElement";

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

interface FoodItemProps {
  item: restuarantItemsDataTypes;
  onClickIncrementFoodItemQuantity: (id: string) => void;
  onClickDecrementFoodItemQuantity: (id: string) => void;
}

const foodItemStrings = {
  foodItemAltText: "Food Item",
  iconSize: 25,
  iconColor: "#ffcc00",
  endingZeros: ".00",
  incrementButtonText: `+`,
  buttonType: "button",
  decrementButtonText: `-`,
  addButtonText: "Add",
};

const FoodItem = (props: FoodItemProps) => {
  const {
    onClickIncrementFoodItemQuantity,
    onClickDecrementFoodItemQuantity,
    item,
  } = props;

  const { id, imageUrl, name, cost, quantity } = item;

  const clickDecrementButton = () => {
    onClickDecrementFoodItemQuantity(id);
  };

  const clickIncrementButton = () => {
    onClickIncrementFoodItemQuantity(id);
  };

  const renderCounterOrButton = () => {
    console.log(quantity);

    return quantity > 0 ? (
      <FoodItemsButtonsContainer>
        <ButtonElement
          buttonText={foodItemStrings.decrementButtonText}
          buttonType={foodItemStrings.buttonType}
          onClickButtonMethod={clickDecrementButton}
        />
        <ItemsQuantityText>{quantity}</ItemsQuantityText>
        <ButtonElement
          buttonText={foodItemStrings.incrementButtonText}
          buttonType={foodItemStrings.buttonType}
          onClickButtonMethod={clickIncrementButton}
        />
      </FoodItemsButtonsContainer>
    ) : (
      <ButtonElement
        buttonText={foodItemStrings.addButtonText}
        buttonType={foodItemStrings.buttonType}
        onClickButtonMethod={clickIncrementButton}
      />
    );
  };

  return (
    <FoodItemContainer>
      <FoodItemImageContainer>
        <FoodItemImage src={imageUrl} />
      </FoodItemImageContainer>
      <FoodItemTextContainer>
        <FoodItemHeading>{name}</FoodItemHeading>
        <FoodItemIconContainer>
          <BiRupee size={foodItemStrings.iconSize} />
          <FoodItemPara>
            {cost}
            {foodItemStrings.endingZeros}
          </FoodItemPara>
        </FoodItemIconContainer>
        <FoodItemIconContainer>
          <AiFillStar
            size={foodItemStrings.iconSize}
            color={foodItemStrings.iconColor}
          />
          <FoodItemPara>{cost}</FoodItemPara>
        </FoodItemIconContainer>
        {renderCounterOrButton()}
      </FoodItemTextContainer>
    </FoodItemContainer>
  );
};

export default FoodItem;
