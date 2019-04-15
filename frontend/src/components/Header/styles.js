import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${metrics.basePadding * 2}px ${metrics.basePadding * 3}px ${metrics.basePadding * 2}px
    ${metrics.basePadding * 3}px;
  margin-bottom: ${metrics.baseMargin * 2}px;
  background: ${colors.primary};

  div#img {
    width: ${metrics.font.big}px;
  }
  a {
    height: ${metrics.font.big}px;
    img {
      font-size: ${metrics.font.big}px;
    }
  }
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  a {
    font-weight: bold;
    font-size: ${metrics.font.small}px;
    color: ${colors.white};
    padding-left: ${metrics.basePadding * 3}px;
    text-decoration: none;
    :hover {
      color: ${colors.white};
      text-shadow: 0px 0px 5px ${colors.white};
    }
  }
`
export const MenuProfile = styled.div`
  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: ${metrics.font.small}px;
    color: ${colors.white};
    background: ${colors.primary};
    padding: ${metrics.basePadding * 2}px ${metrics.basePadding}px ${metrics.basePadding * 2}px ${metrics.basePadding}px;
    text-decoration: none;
    :hover {
      color: ${colors.white};
      text-shadow: 0px 0px 5px ${colors.white};
    }
  }

  li {
    display: block;
  }

  li:hover {
    cursor: pointer;
  }

  ul {
    position: absolute;

    right: 0;
    display: none;
  }

  :hover > ul,
  ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  li {
    clear: both;
    width: 100%;
  }
`
