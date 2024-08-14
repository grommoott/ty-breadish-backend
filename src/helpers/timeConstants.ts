const minuteSeconds = 60
const hourSeconds = 60 * minuteSeconds
const daySeconds = 24 * hourSeconds
const weekSeconds = 7 * daySeconds
const monthSeconds = 30 * daySeconds
const yearSeconds = 365 * daySeconds

const minute = minuteSeconds * 1000
const hour = hourSeconds * 1000
const day = daySeconds * 1000
const week = weekSeconds * 1000
const month = monthSeconds * 1000
const year = yearSeconds * 1000

export { minuteSeconds, hourSeconds, daySeconds, weekSeconds, monthSeconds, yearSeconds, minute, hour, day, week, month, year }
