import { InputStyledElement } from "./styledComponents";

interface InputElementPropsTypes {
  inputValue: string;
  placeHolderText?: string;
  typeOfInput: string;
  onChangeMethod: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputElement = (props: InputElementPropsTypes) => {
  const { inputValue, placeHolderText, typeOfInput, onChangeMethod } = props;

  return (
    <InputStyledElement
      type={typeOfInput}
      value={inputValue}
      placeholder={placeHolderText}
      onChange={onChangeMethod}
    />
  );
};

export default InputElement;
