import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import config from "./src/config/config";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";

const { theme } = config;

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
