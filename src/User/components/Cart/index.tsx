import Footer from "../../../common/components/Footer";
import Header from "../../../common/components/Header";
import CartList from "../CartList";
import { CartContainer } from "./styledComponents";

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

const Cart = (props: cartItemsDataTypes) => {
  const {
    cartItemsData,
    onClickDecrementItemCount,
    onClickIncremenetItemCount,
  } = props;

  return (
    <CartContainer>
      <Header />
      <CartList
        cartItemsData={cartItemsData}
        onClickDecrementItemCount={onClickDecrementItemCount}
        onClickIncremenetItemCount={onClickIncremenetItemCount}
      />
      <Footer />
    </CartContainer>
  );
};

export default Cart;
