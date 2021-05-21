import makeCachedMatcher from 'wouter/matcher'
import {pathToRegexp} from 'path-to-regexp'

const convertPathToRegexp = (path) => {
  const keys = []

  // we use original pathToRegexp package here with keys
  const regexp = pathToRegexp(path, keys)
  return {keys, regexp}
}

const routeMatcher = makeCachedMatcher(convertPathToRegexp)

export default routeMatcher
