export default {
  grid: {
    container: '1440px',
    gutter: '3.2rem',
  },
  
  border: {
    radius: {
      full: '9999rem',
      xlg: '3.125rem',
      medium: '1.125rem',
      xsmall: '0.8rem',
      xxsmall: '0.4rem',
    },
  },

  font: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    sizes: {
      xxsmall: '0.8rem',
      xsmall: '1.0rem',
      small: '1.2rem',
      medium: '1.4rem',
      large: '1.6rem',
      xlarge: '1.8rem',
      xxlarge: '2.6rem',
      '3xlarge': '3.2rem',
      '4xlarge': '4.8rem',
    },
  },

  colors: {
    background: "#F0F0F0",
    black: "#000000",
    lightGray: "#D9D9D9",

    surface: {
      default: "#FAFAFA",
      alt: "#F7F9FC",
      hover: "#F5F5F5"
    },

    border: "#E1E4E8",

    text: {
      primary: "#1F1F1F",
      secondary: "#5F6368",
      disabled: "#BFC3C9",
      placeholder: "#B1B1B1",
      iconMuted: "#7A7A7A",
      title: "#3F3F46",
    },

    primary: {
      default: "#3F63F7",
      hover: "#2E4DE3",
      pressed: "#213BB7",
      light: "#EAF0FF",
      onPrimary: "#FFFFFF"
    },

    secondary: {
      default: "#FFB200",
      hover: "#E59E00",
      light: "#FFF4DA",
      onSecondary: "#2B1D00"
    },

    success: {
      default: "#2BBF7F",
      light: "#E6FBF2",
      text: "#146C46"
    },

    error: {
      default: "#E5484D",
      light: "#FFE9EA",
      text: "#8C1F24"
    },

    info: {
      default: "#3D88F8",
      light: "#EAF3FF",
      text: "#1C3D7C"
    },

    warning: "#FFB200",

    tertiary: "#A0A0A0", // Adicionando cor para texto terciário

    chart: {
      blue: "#3B82F6",
      purple: "#8B5CF6",
      green: "#10B981",
      orange: "#F97316",
      yellow: "#FCD34D",
      red: "#EF4444",
      gray: "#9CA3AF"
    },

    button: {
      solid:{
        default: "#1A1A1A",
        hover: "#2A2A2A",
        text: "#FFFFFF",
      },
      
      outline: {
        default: "#FCFCFC",
        hover: "#E6E6E6",
        border: "#E2E2E2",
        text: "#333333",
      },
    },

  },


  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem',
    xxxlarge: '6.4rem',
  },

  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },

  breakpoints: {
    xs: '320px',
    sm: '450px',
    md: '768px',
    lg: '1170px',
    xl: '1440px',
  },
}