import { createTheme, Theme } from '@material-ui/core/styles'
import { color } from '../presentational/foundation/color'

// Override Mui's theme typings to include the new theme property
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    monochrome: {},
    border?: {}
  }
  interface ThemeOptions {
    monochrome?: {},
    border?: {}
  }
}

export const theme: Theme = createTheme({
  palette: color.palette,
  monochrome: color.monochrome,
  border: color.border,
})
