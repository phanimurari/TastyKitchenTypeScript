import { foodItemObjectTypes } from "../types";

class FoodItemModel {
    id
    cost
    foodType
    imageUrl
    name
    rating
    quantity
    constructor(item: foodItemObjectTypes) {
        this.id = item.id
        this.cost = item.cost
        this.foodType = item.food_type
        this.imageUrl = item.image_url
        this.name = item.name
        this.rating = item.rating
        this.quantity = 0
    }
}

export { FoodItemModel };