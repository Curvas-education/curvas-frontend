import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import config from "./src/config/config";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";

const { theme } = config;

const state = {
  screens: {
    home: "",
    signin: "auth/signin",
    signup: "auth/signup",
  },
};

const linking = {
  prefixes: [],
  config: state,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
