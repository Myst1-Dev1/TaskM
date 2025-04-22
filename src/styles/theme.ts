import { colors } from "./colors";
import { fontFamily } from "./font-family";

const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    card: '#F3F4F6',
    green: {
      600: '#22C55E',
    },
    skeleton: {
      'container': colors.gray[100],
      'skeleton': colors.gray[300],
    }
  };

const darkTheme = {
    background: '#1E1E1E',
    text: '#FFFFFF',
    card: '#282828',
    green: {
        600: '#22C55E',
    },
    skeleton: {
      'container': '#494949',
      'skeleton': '#272727',
    }
}

export { colors, fontFamily, lightTheme, darkTheme };