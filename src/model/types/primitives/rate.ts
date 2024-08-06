const rates = [1, 2, 3, 4, 5] as const

type Rate = typeof rates[number]

export { Rate }
