import { carouselDataObjectType } from "../types";

class CarouselModel {
  id;
  imageUrl;
  constructor(carouselDataObject: carouselDataObjectType) {
    this.id = carouselDataObject.id;
    this.imageUrl = carouselDataObject.image_url;
  }
}

export { CarouselModel };
