import Loader from "react-loader-spinner";
import { LoaderContainer } from "./styledComponent";

const colors = {
  loaderColor: "#f7931e",
};

const LoaderComponent = () => (
  <LoaderContainer>
    <Loader
      color={colors.loaderColor}
      height={80}
      type="ThreeDots"
      width={80}
    />
  </LoaderContainer>
);

export default LoaderComponent;
