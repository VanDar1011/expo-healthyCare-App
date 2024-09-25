import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import Routes from "./src/routes";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLIC_KEY } from "./src/utils/config";
// console.log(PUBLIC_KEY);
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ErrorBoundary>
          <SafeAreaView style={{ flex: 1 }}>
            <StripeProvider publishableKey={PUBLIC_KEY}>
              <Routes />
            </StripeProvider>
          </SafeAreaView>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
