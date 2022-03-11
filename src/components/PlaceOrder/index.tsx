import { Link } from "react-router-dom";
import {
  PlaceOrderContainer,
  PlaceOrderDescription,
  PlaceOrderHeading,
} from "./styledComponents";

const placeOrderStrings = {
  main: "Payment Successful",
  descriptionOne: "Thank you for ordering",
  descriptionTwo: "Your payment is successfully completed",
  goToHomePageString: "Go To Home Page",
};

const PlaceOrder = () => (
  <PlaceOrderContainer>
    <PlaceOrderHeading>{placeOrderStrings.main}</PlaceOrderHeading>
    <PlaceOrderDescription>
      {placeOrderStrings.descriptionOne}
    </PlaceOrderDescription>
    <PlaceOrderDescription>
      {placeOrderStrings.descriptionTwo}
    </PlaceOrderDescription>
  </PlaceOrderContainer>
);

export default PlaceOrder;
