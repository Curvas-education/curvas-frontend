import {
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import { API_HOST } from "@env";

const config = {
  api: {
    url: `http://${API_HOST}:8800`,
    timeout: 8000,
  },
  theme: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      navbar: {
        background: "#e7e0ec",
        color: "#764abc",
      },
      bottomNav: {
        background: "#D6BCFF",
        color: "black",
      },
      primary: "#764abc",
      secondary: "blue",
      tertiary: "red",
      background: "#e7e0ec",
      warning: "#E2EF70",
      success: "#41EAD4",
      error: "#ef709d",
      info: "#009DDC",
    },
  },
  fonts: {
    "JetBrainsMono-Thin": require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Thin.ttf"),
    "JetBrainsMono-Light": require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Light.ttf"),
    "JetBrainsMono-Regular": require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Bold.ttf"),
    "JetBrainsMono-Medium": require("../../assets/fonts/JetBrainsMono/JetBrainsMono-Medium.ttf"),
  }
};

export default config;