import Footer from "../../common/components/Footer";
import Header from "../../common/components/Header";
import FoodItem from "../FoodItem";
import RestuarantDetailsHeader from "../RestuarantDetailsHeader";
import {
  FoodItemsList,
  ItemsContainer,
  RestuarantDetailsPage,
} from "./styledComponents";

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

interface RestuarantDetailsPropsTypes {
  resturantData: restuarantDataTypes;
  itemsData: Array<restuarantItemsDataTypes>;
  onClickIncrementFoodItemQuantity: (id: string) => void;
  onClickDecrementFoodItemQuantity: (id: string) => void;
}

const RestuarantDetails = (props: RestuarantDetailsPropsTypes) => {
  const {
    resturantData,
    itemsData,
    onClickIncrementFoodItemQuantity,
    onClickDecrementFoodItemQuantity,
  } = props;
  const renderListOfItems = () =>
    itemsData.map((item: restuarantItemsDataTypes) => (
      <FoodItem
        item={item}
        key={item.id}
        onClickIncrementFoodItemQuantity={onClickIncrementFoodItemQuantity}
        onClickDecrementFoodItemQuantity={onClickDecrementFoodItemQuantity}
      />
    ));

  return (
    <RestuarantDetailsPage>
      <Header />
      <RestuarantDetailsHeader resturantData={resturantData} />
      <ItemsContainer>
        <FoodItemsList>{renderListOfItems()}</FoodItemsList>
      </ItemsContainer>
      <Footer />
    </RestuarantDetailsPage>
  );
};

export default RestuarantDetails;
