import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import { API_HOST } from '@env'

const fontConfig = {
  web: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

const config = {
  api: {
    url: `http://${API_HOST}:8800`,
    timeout: 8000
  },
  theme: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      navbar: {
        background: '#e7e0ec',
        color: '#764abc'
      },
      bottomNav: {
        background: '#D6BCFF',
        color: 'black'
      },
      primary: "#764abc",
      secondary: "blue",
      tertiary: "red",
      background: "#e7e0ec",
    },
    // fonts: configureFonts({ config: fontConfig, isV3: false }),
  },
};

export default config;
