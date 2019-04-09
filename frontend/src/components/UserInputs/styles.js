import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  width: 100%;
  align-items: flex-start;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 ${metrics.basePadding * 2}px 0;
  position: relative;

  font-family: Helvetica-Bold;
  font-size: ${metrics.font.small}px;
  color: #ffffff;
  text-align: left;

  div {
    padding: 0 0 ${metrics.basePadding * 2}px 0;
  }
`

export const TextField = styled.input`
  background-color: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 3}px;
  height: ${metrics.inputHeight}px;
  border: 0;

  font-family: Helvetica;
  font-size: ${metrics.font.big}px;
  color: ${colors.white};

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`
