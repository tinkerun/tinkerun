import Color from 'color'
import {filterUndefined} from './filterUndefined'

const defaultProps = {
  backgroundColor: '#fff',
  foregroundColor: '#000',
  cursorColor: '#000',
  selectionColor: '#666',

  colors: {
    black: '#000000',
    red: '#990000',
    green: '#00A600',
    yellow: '#999900',
    blue: '#0000B2',
    magenta: '#B200B2',
    cyan: '#00A6B2',
    white: '#BFBFBF',
    lightBlack: '#666666',
    lightRed: '#E50000',
    lightGreen: '#00D900',
    lightYellow: '#E5E500',
    lightBlue: '#0000FF',
    lightMagenta: '#E500E5',
    lightCyan: '#00E5E5',
    lightWhite: '#E5E5E5',
  },
}

/**
 * edit from hyper getTermOptions function
 * https://github.com/vercel/hyper/blob/canary/lib/components/term.tsx#L39
 *
 * @param {Object} props
 * @returns {Object}
 */
export const getTermOptions = (props = defaultProps) => {
  // Set a background color only if it is opaque
  const needTransparency = Color(props.backgroundColor).alpha() < 1
  const backgroundColor = needTransparency ? 'transparent' : props.backgroundColor

  return filterUndefined({
    cursorStyle: 'bar',
    cursorBlink: props.cursorBlink,
    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    fontWeightBold: props.fontWeightBold,
    lineHeight: props.lineHeight,
    letterSpacing: props.letterSpacing,
    allowTransparency: needTransparency,
    theme: {
      foreground: props.foregroundColor,
      background: backgroundColor,
      cursor: props.cursorColor,
      cursorAccent: props.cursorAccentColor,
      selection: props.selectionColor,
      black: props.colors.black,
      red: props.colors.red,
      green: props.colors.green,
      yellow: props.colors.yellow,
      blue: props.colors.blue,
      magenta: props.colors.magenta,
      cyan: props.colors.cyan,
      white: props.colors.white,
      brightBlack: props.colors.lightBlack,
      brightRed: props.colors.lightRed,
      brightGreen: props.colors.lightGreen,
      brightYellow: props.colors.lightYellow,
      brightBlue: props.colors.lightBlue,
      brightMagenta: props.colors.lightMagenta,
      brightCyan: props.colors.lightCyan,
      brightWhite: props.colors.lightWhite,
    },
  })
}
