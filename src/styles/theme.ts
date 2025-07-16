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

  //NOVA PALETA DE CORES

  // #340773
  // #150140
  // #0D0126
  // #9373D9 
  // #A68A56
  
  colors: {
    background: "#150140",
    black: "#000000",
    lightGray: "#D9D9D9",

    surface: {
      default: "#f3f3f3ff",
      alt: "#F7F9FC",
      hover: "#F5F5F5"
    },

    border: "#E1E4E8",

    text: {
      primary: "#1F1F1F",
      secondary: "#5F6368",
      tertiary: "#A0A0A0",
      disabled: "#BFC3C9",
      placeholder: "#B1B1B1",
      iconMuted: "#7A7A7A",
      title: "#3F3F46",
    },

    primary: {
      default: "#340773",
      hover: "#150140",
      pressed: "#0D0126",
      light: "#e0d7f4",
      xlight: "#9373D9",
      onPrimary: "#FFFFFF",
      opacity: {
        100: "rgba(52, 7, 115, 1)",
        80: "rgba(52, 7, 115, 0.8)",
        60: "rgba(52, 7, 115, 0.6)",
        40: "rgba(52, 7, 115, 0.4)",
        20: "rgba(52, 7, 115, 0.2)",
        10: "rgba(52, 7, 115, 0.1)",
      },
    },

    secondary: {
      default: "#A68A56",
      hover: "#877045",
      light: "#dcd1bc",
      onSecondary: "#2B1D00",
      opacity: {
        100: "rgba(166, 138, 86, 1)",
        80: "rgba(166, 138, 86, 0.8)",
        60: "rgba(166, 138, 86, 0.6)",
        40: "rgba(166, 138, 86, 0.4)",
        20: "rgba(166, 138, 86, 0.2)",
        10: "rgba(166, 138, 86, 0.1)",
      },
    },

    success: {
      default: "#2BBF7F",
      light: "#E6FBF2",
      text: "#146C46"
    },

    error: {
      default: "#E5484D",
      hover: "#C63C40",
      light: "#FFE9EA",
      text: "#8C1F24",
      onError: "#FDF2F2",
    },

    info: {
      default: "#3D88F8",
      light: "#EAF3FF",
      text: "#1C3D7C"
    },

    warning: {
      default: "#FFB200",
      hover: "#E59E00",
      light: "#FFF4DA",
      textOnWarning: "#2B1D00",
      opacity: {
        100: "rgba(255, 178, 0, 1)",
        80: "rgba(255, 178, 0, 0.8)",
        60: "rgba(255, 178, 0, 0.6)",
        40: "rgba(255, 178, 0, 0.4)",
        20: "rgba(255, 178, 0, 0.2)",
        10: "rgba(255, 178, 0, 0.1)",
      },
    },

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