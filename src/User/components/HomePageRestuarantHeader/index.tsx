import { VscListSelection } from "react-icons/vsc";

import {
  Description,
  DescriptionAndSelectContainer,
  Heading,
  PopularRestuarantsHeader,
  SelectElement,
  SelectIconAndElementContainer,
} from "./styledComponent";

const popularRestuarantHeaderStrings = {
  heading: "Popular Restaurants",
  description:
    "Select your Favourite Restaurants and Favourite Dish and make your Day Happy!",
  selectIconSize: 25,
};

const sortByOptions = [
  {
    id: 0,
    displayText: "Highest",
    value: "Highest",
  },
  {
    id: 2,
    displayText: "Lowest",
    value: "Lowest",
  },
];

interface PopularRestuarantHeaderPropsTypes {
  onChangeSelect: (value: string) => void;
}

const PopularRestuarantHeader = (props: PopularRestuarantHeaderPropsTypes) => {
  const renderOption = () => {
    const options = sortByOptions.map((option) => (
      <option key={option.id} value={option.value}>
        {option.displayText}
      </option>
    ));
    return options;
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { onChangeSelect } = props;
    const { value } = event.target;
    onChangeSelect(value);
  };

  return (
    <PopularRestuarantsHeader>
      <Heading>{popularRestuarantHeaderStrings.heading}</Heading>
      <DescriptionAndSelectContainer>
        <Description>{popularRestuarantHeaderStrings.description}</Description>
        <SelectIconAndElementContainer>
          <VscListSelection
            size={popularRestuarantHeaderStrings.selectIconSize}
          />
          <SelectElement onChange={onChangeSelect}>
            {renderOption()}
          </SelectElement>
        </SelectIconAndElementContainer>
      </DescriptionAndSelectContainer>
    </PopularRestuarantsHeader>
  );
};

export default PopularRestuarantHeader;
