/**
 * Takes a time string in 12 hour format and returns the equivalent time in 24 hour
 * format.
 *
 * @param {string} t - Time string in 12 hour format
 *
 * @returns {string} - Time string in 24 hour format
 */
export function turnTimeto24HourFormat(t: string): string {
  const [time, meridiem] = t.split(' ')
  const [hours, minutes, seconds] = time.split(':')

  const hour = parseInt(hours) + (meridiem === 'PM' ? 12 : 0)
  return `${hour}:${minutes}`
}

/**
 * Takes a time string in 12 hour format and returns a percentage from 0 to 100
 * indicating the percentage of the day that has passed.
 *
 * @param {string} t - Time string in 12 hour format
 *
 * @returns {number} - Percentage of the day that has passed
 */
export function turnTimeToPercentage(t: string): number {
  const hours = parseInt(t.split(':')[0])
  const minutes = parseInt(t.split(':')[1])
  const totalMinutes = hours * 60 + minutes
  const percent = (totalMinutes / 1440) * 100
  return percent
}