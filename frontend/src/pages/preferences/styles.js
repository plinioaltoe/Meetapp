import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: ${metrics.baseDefault * 2.6}px 0 ${metrics.baseDefault * 3}px 0;
`
export const Content = styled.div`
  max-width: ${metrics.baseMargin * 16}px;
`

export const Titulo = styled.div`
  font-weight: bold;
  font-size: ${metrics.font.bigger}px;
  color: ${colors.white};
  padding: 0 0 ${metrics.basePadding * 0.5}px 0;
`

export const Descricao = styled.div`
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
  opacity: 0.8;
  line-height: 28px;
  padding: ${metrics.basePadding * 2}px 0 ${metrics.basePadding * 2}px 0;
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
