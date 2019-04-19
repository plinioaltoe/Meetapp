import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding-top: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding * 3}px;
  font-color: ${metrics.white};

  p {
    color: ${colors.danger};
    margin-bottom: ${metrics.baseMargin}px;
    border: 1px solid ${colors.danger};
    padding: ${metrics.basePadding}px;
    width: 100%;
    text-align: center;
  }
`

export const Img = styled.div`
  img {
    max-width: ${metrics.baseDefault * 4}px;
    max-height: ${metrics.thumbHeight}px;
  }

  margin: ${metrics.basePadding * 2}px 0 ${metrics.basePadding * 2}px 0;
  box-sizing: content-box;
  border: dashed ${colors.white} 1px;
  opacity: 0.2;
  padding: ${props => (props.fileUrl
    ? `${metrics.basePadding * 1}px ${metrics.basePadding * 3}px;`
    : `${metrics.basePadding * 3}px ${metrics.basePadding * 10}px;`)};

  display: flex;
  justify-content: center;
  cursor: pointer;
  i {
    color: ${colors.white};
  }
  input#file {
    display: none;
  }
`

export const Text = styled.div`
  font-weight: bold;
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
`
