import styled from 'styled-components'

import { metrics, colors } from '../../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${metrics.basePadding}px 0 ${metrics.basePadding}px 0;
  margin-bottom: ${metrics.baseMargin}px;

  }
`

export const Content = styled.div`
  width: ${metrics.baseDefault * 9}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  padding: ${metrics.basePadding}px 0 ${metrics.basePadding}px 0;
  margin-bottom: ${metrics.baseMargin}px;
  align-items: center;
`
export const ButtonPagination = styled.div`
  width: ${metrics.baseDefault * 2}px
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${colors.white};
  align-items: center;

button {
  border-radius: 50%;
  height: ${metrics.baseMargin}px;
  width: ${metrics.baseMargin}px;
  background: ${colors.primary};
  border-style: none;
  i {
    color: ${colors.white};
  }
`
