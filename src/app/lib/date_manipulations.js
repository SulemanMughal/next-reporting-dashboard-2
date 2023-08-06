const current_date = new Date()
const start_date = new Date("2023-07-30T00:14:29.313Z")
const end_date = new Date("2023-07-30T22:17:29.314Z")


console.debug(current_date, start_date, end_date)
console.debug(start_date < current_date)

const elapsed_time = end_date-current_date
console.debug(Math.floor((elapsed_time ) / (1000*60*60)))
