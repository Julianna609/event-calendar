/**
 * Color log message.
 * The log message created via this function won't be removed for production as well
 *
 * @param {*} arguments
 */
export const log = (...args) => {
  return console.info('%c[DEBUG]', 'color: #ffaa00', ...args)
}
