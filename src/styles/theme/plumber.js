import _ from 'lodash'
import { css } from 'styled-components'
import { getValueAndUnit } from 'polished'
import { unitless } from './scale'

const BASELINE = {
  EGYPTIENNE: 0.18,
  MILLER_DISPLAY: 0.183,
  MILLER_TEXT: 0.183,
}

const round = _.partial(_.round, _.partial.placeholder, 3)

const getBaselineCorrection = ({ baseline, fontSize, lineHeight }) => {
  const baselineFromBottom = (lineHeight - fontSize) / 2 + fontSize * baseline
  const correctedBaseline = _.round(baselineFromBottom)
  const baselineDifference = correctedBaseline - baselineFromBottom

  return {
    baselineDifference,
    correctedBaseline,
  }
}

const getPlumber = ({
  baseline: B,
  fontSize: FONT_SIZE = 2,
  gridHeight: GRID_HEIGHT = '1rem',
  leadingBottom: LEADING_BOTTOM = 0,
  leadingTop: LEADING_TOP = 0,
  lineHeight: LINE_HEIGHT = 3,
  useBaselineOrigin: USE_BASELINE_ORIGIN = false,
}) => {
  function plumber({
    baseline = B,
    fontSize = FONT_SIZE,
    gridHeight = GRID_HEIGHT,
    leadingBottom = LEADING_BOTTOM,
    leadingTop = LEADING_TOP,
    lineHeight = LINE_HEIGHT,
    useBaselineOrigin = USE_BASELINE_ORIGIN,
  } = {}) {
    const [gridHeightValue, gridHeightUnit] = getValueAndUnit(gridHeight)
    fontSize = unitless(fontSize)
    lineHeight = unitless(lineHeight)

    const { baselineDifference, correctedBaseline } = getBaselineCorrection({
      baseline,
      fontSize,
      lineHeight,
    })

    if (useBaselineOrigin) {
      leadingTop -= lineHeight - correctedBaseline
      leadingBottom -= correctedBaseline
    }

    const shift = baselineDifference < 0 ? 0 : 1

    fontSize = round(fontSize * gridHeightValue)
    const marginTop = round((leadingTop - shift) * gridHeightValue)
    const paddingTop = round((shift - baselineDifference) * gridHeightValue)
    const paddingBottom = round(
      (1 - shift + baselineDifference) * gridHeightValue,
    )
    const marginBottom = round((leadingBottom + shift - 1) * gridHeightValue)

    return css`
      margin-top: ${ marginTop }${ gridHeightUnit };
      margin-bottom: ${ marginBottom }${ gridHeightUnit };
      padding-top: ${ paddingTop }${ gridHeightUnit };
      padding-bottom: ${ paddingBottom }${ gridHeightUnit };

      font-size: ${ fontSize }${ gridHeightUnit };
      line-height: ${ lineHeight }${ gridHeightUnit };
    `
  }

  plumber.box = function ({
    border = ['0px', '0px'],
    gridHeight = GRID_HEIGHT,
    margin = [0, 0],
    padding = [0, 0],
  }) {
    const [gridHeightValue, gridHeightUnit] = getValueAndUnit(gridHeight)

    const [marginTop, marginBottom] = margin.map(m =>
      round(m * gridHeightValue),
    )
    const [paddingTop, paddingBottom] = padding.map(p =>
      round(p * gridHeightValue),
    )
    const [borderTop, borderBottom] = border

    return css`
      margin-top: ${ marginTop }${ gridHeightUnit };
      margin-bottom: ${ marginBottom }${ gridHeightUnit };
      padding-top: calc(${ paddingTop }${ gridHeightUnit } - ${ borderTop });
      padding-bottom: calc(${ paddingBottom }${ gridHeightUnit } - ${ borderBottom });
    `
  }

  return plumber
}

export const primary = getPlumber({ baseline: BASELINE.MILLER_TEXT })
export const accent = getPlumber({ baseline: BASELINE.EGYPTIENNE })
export const hed = getPlumber({ baseline: BASELINE.MILLER_DISPLAY })
