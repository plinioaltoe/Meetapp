import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding * 3}px;
  font-color: ${metrics.white};

  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      padding-top: ${metrics.basePadding * 1.5}px;

      div {
        font-size: ${metrics.font.mean}px;
        color: ${colors.white};
        padding-left: ${metrics.basePadding}px;
      }
    }
  }
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseMargin}px;
  height: ${metrics.baseMargin}px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: 0;
  background: ${colors.whiteTransparent};
  cursor: pointer

  :checked {
    background: ${colors.primary};
  }
`
