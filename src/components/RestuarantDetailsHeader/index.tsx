import { AiFillStar } from "react-icons/ai";

import { BiRupee } from "react-icons/bi";

import {
  HighLightIconText,
  HightLightIconContainer,
  InnerContainer,
  RestaurantHighLightsContainer,
  ResturantDetailsImage,
  ResturantDetailsImageContainer,
  ResturantDetailsTextContainer,
  ResturantHeaderPara,
  ResturantName,
  StyledRestuarantDetailsHeader,
} from "./styledComponents";

interface resturantDataTypes {
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

interface RestuarantDetailsHeaderTypes {
  resturantData: resturantDataTypes;
}

const restuarantDetailsHeaderStrings = {
  iconSize: 25,
  noOfRatings: `+ Ratings`,
  costForTwo: "Cost for two",
};

const RestuarantDetailsHeader = (props: RestuarantDetailsHeaderTypes) => {
  const { resturantData } = props;

  const {
    id,
    imageUrl,
    restuarantName,
    restuarantCusine,
    restuarantLocation,
    restuarantRating,
    noOfReviews,
    itemsCount,
    costForTwo,
  } = resturantData;
  return (
    <StyledRestuarantDetailsHeader>
      <ResturantDetailsImageContainer>
        <ResturantDetailsImage src={imageUrl} />
      </ResturantDetailsImageContainer>
      <ResturantDetailsTextContainer>
        <ResturantName>{restuarantName}</ResturantName>
        <ResturantHeaderPara>{restuarantCusine}</ResturantHeaderPara>
        <ResturantHeaderPara>{restuarantLocation}</ResturantHeaderPara>
        <RestaurantHighLightsContainer>
          <HightLightIconContainer>
            <InnerContainer>
              <AiFillStar size={restuarantDetailsHeaderStrings.iconSize} />
              <HighLightIconText>{restuarantRating}</HighLightIconText>
            </InnerContainer>
            <InnerContainer>
              <HighLightIconText>
                {noOfReviews}
                {restuarantDetailsHeaderStrings.noOfRatings}
              </HighLightIconText>
            </InnerContainer>
          </HightLightIconContainer>
          <HightLightIconContainer>
            <InnerContainer>
              <BiRupee size={restuarantDetailsHeaderStrings.iconSize} />
              <HighLightIconText>{costForTwo}</HighLightIconText>
            </InnerContainer>
            <InnerContainer>
              <HighLightIconText>
                {restuarantDetailsHeaderStrings.costForTwo}
              </HighLightIconText>
            </InnerContainer>
          </HightLightIconContainer>
        </RestaurantHighLightsContainer>
      </ResturantDetailsTextContainer>
    </StyledRestuarantDetailsHeader>
  );
};
export default RestuarantDetailsHeader;
