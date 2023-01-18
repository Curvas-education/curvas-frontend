import { useFonts } from "expo-font";
import { createContext } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import config from "../config/config";

const { theme, fonts } = config;

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: theme?.colors?.primary,
        }}
      >
        <ActivityIndicator color={theme?.colors?.background} size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
