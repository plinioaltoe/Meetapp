import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: 0 0 ${metrics.baseDefault * 3}px 0;
  img {
    max-width: ${metrics.baseDefault * 9}px;
    max-height: ${metrics.thumbHeight * 4}px;
    min-width: ${metrics.baseDefault * 4}px;
    min-height: ${metrics.thumbHeight * 2}px;
    padding: 0 0 ${metrics.basePadding * 3}px 0;
  }

  p {
    max-width: ${metrics.baseMargin * 15}px;
    color: ${colors.danger};
    margin-bottom: ${metrics.baseMargin}px;
    border: 1px solid ${colors.danger};
    padding: ${metrics.basePadding}px;
    width: 100%;
    text-align: center;
  }
`
export const Content = styled.div`
  max-width: ${metrics.baseMargin * 15}px;
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
export const Detalhes = styled.div`
  font-size: ${metrics.font.smaller}px;
  color: ${colors.regular};
`
export const Endereco = styled.div`
  font-size: ${metrics.font.smaller}px;
  color: ${colors.white};
  opacity: 0.8;
  line-height: 24px;
  padding: ${metrics.basePadding}px 0 ${metrics.basePadding * 3}px 0;
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
