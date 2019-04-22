import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 ${metrics.basePadding}px ${metrics.basePadding * 2}px 0;
  position: relative;
  button {
    i {
      color: ${colors.regular};
    }
    position: relative;
    cursor: pointer;
    left: 30px;
    padding: 0;
    border: none;
    background: none;
  }
`

export const TextField = styled.input`
  background-color: ${colors.dark};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 9}px;
  height: ${metrics.inputHeight}px;
  border: 0;

  font-family: Helvetica;
  font-size: ${metrics.font.smaller}px;
  color: ${colors.regular};
  letter-spacing: 0;
  text-align: left;

  padding-left: ${metrics.basePadding * 4}px;
`

export const ContainerList = styled.div`
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

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
}
`
