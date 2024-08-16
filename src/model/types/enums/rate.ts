const Rates = [1, 2, 3, 4, 5] as const

type Rate = typeof Rates[number]

export { Rate, Rates }
