/**
 * 检查快捷键和键盘事件是否匹配
 *
 * @param {KeyboardEvent} event
 * @param {[]} shortcuts
 * @return {boolean}
 */
export function isMatchShortcut (event, shortcuts) {
  return shortcuts.reduce((res, value) => {
    if (value === 'Control') {
      return event.ctrlKey && res
    }

    if (value === 'Meta') {
      return event.metaKey && res
    }

    if (value === 'Alt') {
      return event.altKey && res
    }

    if (value === 'Shift') {
      return event.shiftKey && res
    }

    return value === event.key && res
  }, true)
}
