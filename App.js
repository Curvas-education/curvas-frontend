import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import { ThemeProvider } from "./src/contexts/theme";

const state = {
  screens: {
    splash: "",
    home: "home",
    questionlist: "question/list",
    signin: "auth/signin",
    signup: "auth/signup",
    instructions: "auth/signup/instructions",
    selectusertype: "auth/signup/usertype",
  },
};

const linking = {
  prefixes: [],
  config: state,
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
