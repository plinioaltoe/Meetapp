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

  input {
    margin: 0 0 ${metrics.basePadding * 2}px 0;
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
  }
`

export const Text = styled.div`
  font-weight: bold;
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
`

export const TextField = styled.input`
  margin: 0 0 ${metrics.basePadding * 2}px 0;
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
