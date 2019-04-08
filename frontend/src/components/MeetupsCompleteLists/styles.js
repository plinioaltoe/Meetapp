import styled from 'styled-components'

import { metrics, colors } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.white}
  font-size: ${metrics.font.small}px;
  font-weight: bold;
  padding: ${metrics.basePadding}px 0 ${metrics.basePadding}px 0;
  margin-bottom: ${metrics.baseMargin}px;
  align-items: center;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
}
`
