import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${metrics.basePadding * 3}px;
  padding-right: ${metrics.basePadding * 3}px;
  padding-top: ${metrics.basePadding * 2}px;
  padding-bottom: ${metrics.basePadding * 2}px;
  background: ${colors.primary};

  div#img {
    width: ${metrics.font.big}px;
  }
  a {
    height: ${metrics.font.big}px;
    img {
      font-size: ${metrics.font.big}px;
    }
  }
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  a {
    font-weight: bold;
    font-size: ${metrics.font.small}px;
    color: ${colors.white};
    padding-left: ${metrics.basePadding * 3}px;
    text-decoration: none;
  }
`
