/**
 * get the color with tag
 *
 * @param {string} tag
 * @returns {string}
 */
export const tagColor = tag => {
  switch (tag) {
    case 'local':
      return 'green'
    case 'testing':
      return 'blue'
    case 'development':
      return 'teal'
    case 'staging':
      return 'orange'
    case 'production':
      return 'red'
    default:
      return 'neutral'
  }
}
