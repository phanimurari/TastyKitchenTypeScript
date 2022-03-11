import ButtonElement from "../../common/components/ButtonElement";
import {
  DecreaseButton,
  IncreaseButton,
  PaginationContainer,
  PaginationCount,
} from "./styledComponents";

const PaginationComponentString = {
  decreaseButtonText: "-",
  increaseButtonText: "+",
  buttonType: "button",
};

interface PaginationComponentProps {
  onDecreasePage: () => void;
  onIncreasePage: () => void;
  paginationPageCount: number;
}

const PaginationComponent = (props: PaginationComponentProps) => {
  const { onDecreasePage, onIncreasePage, paginationPageCount } = props;

  return (
    <PaginationContainer>
      <ButtonElement
        onClickButtonMethod={onDecreasePage}
        buttonText={PaginationComponentString.decreaseButtonText}
        buttonType={PaginationComponentString.buttonType}
      />
      <PaginationCount>{paginationPageCount}</PaginationCount>
      <ButtonElement
        onClickButtonMethod={onIncreasePage}
        buttonText={PaginationComponentString.increaseButtonText}
        buttonType={PaginationComponentString.buttonType}
      />
    </PaginationContainer>
  );
};

export default PaginationComponent;
