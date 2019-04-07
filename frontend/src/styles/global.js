import { createGlobalStyle } from 'styled-components'

import 'font-awesome/css/font-awesome.css'
import { colors } from './index'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body {
    background: ${colors.secondary};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: Helvetica, sans-serif;
  }
`
export default GlobalStyle
