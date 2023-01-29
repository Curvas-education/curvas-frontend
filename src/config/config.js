import { MD3LightTheme as DefaultTheme } from "react-native-paper";

import { API_HOST } from "@env";

const config = {
  api: {
    url: `http://${API_HOST}:8080`,
    timeout: 8000,
  },
  theme: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      navbar: {
        background: "#764abc",
        color: "#e7e0ec",
      },
      bottomNav: {
        background: "#D6BCFF",
        color: "black",
      },
      primary: "#764abc",
      onSurface: "#764abc",
      secondary: "#583493",
      tertiary: "red",
      background: "#e7e0ec",
      light: "#f7f0fc",
      dark: "#130d1c",
      warning: "#B4AB02",
      success: "#128612",
      danger: "#D92955",
      info: "#2A80D7",
    },
    roundness: 1,
  },
  fonts: {
    "Roboto-Thin": require("../../assets/fonts/Roboto/Roboto-Thin.ttf"),
    "Roboto-Light": require("../../assets/fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  },
};

export default config;
