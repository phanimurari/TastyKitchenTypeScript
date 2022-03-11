import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  StyledCarouselContainer,
  StyledCarouselImage,
  StyledListElement,
} from "./styledComponents";

interface CarouselComponentPropsObjectTypes {
  imageUrl: string;
  id: number;
}

interface carouselDatPropsTypes {
  carouselData: Array<CarouselComponentPropsObjectTypes>;
}

const CarouselComponent = (props: carouselDatPropsTypes) => {
  const { carouselData } = props;

  const renderCarouselSlider = () =>
    carouselData.map((carouselElement) => (
      <StyledListElement key={carouselElement.id}>
        <StyledCarouselImage src={carouselElement.imageUrl} alt="offer" />
      </StyledListElement>
    ));

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    centerMode: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <StyledCarouselContainer>
      <Slider {...settings}>{renderCarouselSlider()}</Slider>
    </StyledCarouselContainer>
  );
};

export default CarouselComponent;
