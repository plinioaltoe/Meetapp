import styled from 'styled-components'

import { colors, metrics } from '../../../../styles'

export const Container = styled.div`
  background: ${colors.white};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.thumbWidth}px;
  height: ${metrics.cardHeight}px;

  img {
    border-radius: ${metrics.baseRadius}px ${metrics.baseRadius}px 0 0;
    width: ${metrics.thumbWidth}px;
    height: ${metrics.thumbHeight}px;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: ${metrics.basePadding * 1.5}px 0 0 0;
  button {
    border-radius: 50%;
    height: ${metrics.baseMargin * 2}px;
    width: ${metrics.baseMargin * 2}px;
    background: ${colors.primary};
    cursor: pointer;
    i {
      color: ${colors.white};
    }
  }
`

export const Title = styled.div`
  font-weight: bold;
  font-size: ${metrics.font.small}px;
  color: ${colors.darker};
`

export const InfoMembers = styled.div`
  font-size: ${metrics.font.smaller}px;
  color: ${colors.regular};
`
