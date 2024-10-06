import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedRoute from "../components/ProtectedRoute";
import HomeVip from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import AppointmentNowScreen from "../screens/AppointmentNowScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import AppointmentDetailsScreen from "../screens/AppointmentDetailsScreen";
import MedicineBenefitScreen from "../components/MedicineBenefitScreen";
import TermsPrivacyScreen from "../components/TermsPrivacyScreen";
import DetailsMedicineScreen from "../screens/DetailsMedicineScreen";
import MedicinesScreen from "../screens/MedicinesScreen";
import ArcilesDetailsScreen from "../screens/ArctilesDetailsScreen";
import ProfileScreen from "../screens/Profile";
import DoctorsGroupScreen from "../screens/DoctorsGroupScreen";
import DoctorsGroupDetailScreen from "../screens/DoctorsGroupDetailScreen";
import { useSelector } from "react-redux";
import MapScreen from "../screens/MapScreen";
const Stack = createNativeStackNavigator();
const Routes = () => {
  const { userId } = useSelector((state) => state.profile);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeVip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medicines"
          component={MedicinesScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Articles"
          component={ArticlesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArctilesDetails"
          component={ArcilesDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DoctorGroupDetail"
          component={DoctorsGroupDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsPrivacyScreen"
          component={TermsPrivacyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BenefitScreen"
          component={MedicineBenefitScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppointmentNow"
          component={AppointmentNowScreen}
          options={{ headerShown: false }}
        />
        {/* // require Login */}
        <Stack.Screen name="Appointment" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <AppointmentScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* // comment require Login */}
        {/* <Stack.Screen name="AppointmentNow" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <AppointmentNowScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen> */}
        <Stack.Screen name="DetailsMedicine" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <DetailsMedicineScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="DoctorGroup" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <DoctorsGroupScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AppointmentDetails"
          options={{ headerShown: false }}
        >
          {() => (
            <ProtectedRoute>
              <AppointmentDetailsScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <CartScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
