const CookingMethods = {
    Boiled: "boiled",
    Fried: "fried",
    Baked: "baked"
} as const

type CookingMethod = typeof CookingMethods[keyof typeof CookingMethods]

export { CookingMethod, CookingMethods }
