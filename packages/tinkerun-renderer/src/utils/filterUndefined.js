import {flatten, unflatten} from 'flat'
import pickBy from 'lodash/pickBy'

/**
 * filter undefined value deeply
 *
 * @param {object} obj
 * @returns {object}
 */
export const filterUndefined = obj => unflatten(pickBy(flatten(obj)))
