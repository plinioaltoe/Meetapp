import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 ${metrics.baseDefault * 3}px 0;
  position: relative;
  form {
    p {
      max-width: ${metrics.baseMargin * 15}px;
      color: ${colors.danger};
      margin-bottom: ${metrics.baseMargin}px;
      border: 1px solid ${colors.danger};
      padding: ${metrics.basePadding}px;
      width: 100%;
      text-align: center;
    }
  }
`
export const Text = styled.div`
  font-weight: bold;
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
`

export const Button = styled.button`
  border-radius: ${metrics.baseRadius * 5}px;
  height: ${metrics.baseMargin * 2.5}px;
  width: ${metrics.baseMargin * 15}px;
  background: ${colors.primary};
  border: 0;
  color: ${colors.white};
  font-size: ${metrics.font.small}px;
  font-weight: bold;
  cursor: pointer;
`

export const TextField = styled.input`
  background-color: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 3}px;
  height: ${metrics.inputHeight}px;
  border: 0;
  margin: 0 0 ${metrics.basePadding * 2}px 0;
  font-family: Helvetica;
  font-size: ${metrics.font.big}px;
  color: ${colors.white};

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`
export const Flat = styled.div`
  input {
    background-color: ${colors.secondary};
    border-radius: ${metrics.baseRadius}px;
    width: ${metrics.baseDefault * 3.2}px;
    height: ${metrics.inputHeight}px;
    border: 0;
    margin: 0 0 ${metrics.basePadding * 2}px 0;
    font-family: Helvetica;
    font-size: ${metrics.font.big}px;
    color: ${colors.white};

    text-align: left;

    ::placeholder {
      opacity: 0.5;
    }
  }
`

export const TextArea = styled.textarea`
  background-color: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 3.4}px;
  height: ${metrics.inputHeight * 3}px;
  border: 0;
  margin: ${metrics.basePadding}px 0 ${metrics.basePadding * 2}px 0;

  font-family: Helvetica;
  font-size: ${metrics.font.big}px;
  color: ${colors.white};

  text-align: left;
  resize: none;

  ::placeholder {
    opacity: 0.5;
  }
`
