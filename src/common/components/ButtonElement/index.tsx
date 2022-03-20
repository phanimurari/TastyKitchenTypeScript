import { StyledButtonElement } from "./styledComponents";

interface ButtonElementPropsTypes {
  buttonText: any;
  buttonType: any;
  onClickButtonMethod?: () => void;
}

const ButtonElement = (props: ButtonElementPropsTypes) => {
  const { buttonText, buttonType, onClickButtonMethod } = props;

  return (
    <StyledButtonElement type={buttonType} onClick={onClickButtonMethod}>
      {buttonText}
    </StyledButtonElement>
  );
};

export default ButtonElement;
