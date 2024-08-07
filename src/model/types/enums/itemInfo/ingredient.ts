const Ingredients = {
    Apple: "apple",
    Broccoli: "broccoli",
    Cabbage: "cabbage",
    Carrot: "carrot",
    Cheese: "cheese",
    Chicken: "chicken",
    Cucumber: "cucumber",
    Egg: "egg",
    Fish: "fish",
    Meat: "meat",
    Melon: "melon",
    Milk: "milk",
    Nuts: "nuts",
    Onion: "onion",
    Pineapple: "pineapple",
    Pumpkin: "pumpkin",
    Tomato: "tomato",
    Watermelon: "watermelon"
}

type Ingredient = typeof Ingredients[keyof typeof Ingredients]

export { Ingredient, Ingredients }
