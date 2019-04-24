import { css } from 'glamor'
import { colors, metrics } from './index'

const toastStyles = {
  toastClassName: css({
    borderRadius: metrics.baseRadius,
    background: colors.lighter,
  }),
  bodyClassName: css({
    background: colors.lighter,
  }),
  progressClassName: css({
    background: colors.primary,
  }),
}
export default toastStyles
